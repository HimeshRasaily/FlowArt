from fastapi import APIRouter, HTTPException, status, Depends, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime
from bson import ObjectId
import re

from models.user import UserCreate, UserResponse, Token, LoginRequest
from utils.auth import verify_password, get_password_hash, create_access_token
from utils.dependencies import get_current_user, security

router = APIRouter(prefix="/auth", tags=["Authentication"])

 

def generate_username(name: str) -> str:
    """Generate a username from name"""
    # Remove special characters and convert to lowercase
    username = re.sub(r'[^a-zA-Z0-9]', '', name.lower())
    # Add random suffix
    import random
    suffix = random.randint(100, 999)
    return f"{username}_{suffix}"

@router.post("/register", response_model=dict, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Register a new user"""
    # Check if email already exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Generate username if not provided
    username = user_data.username or generate_username(user_data.name)
    
    # Check if username exists
    existing_username = await db.users.find_one({"username": username})
    if existing_username:
        # Add random suffix if username exists
        import random
        username = f"{username}_{random.randint(1000, 9999)}"
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user document
    user_doc = {
        "name": user_data.name,
        "username": username,
        "email": user_data.email,
        "password": hashed_password,
        "bio": "",
        "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop",
        "location": "",
        "medium": "Digital",
        "experience": "Emerging",
        "social": {
            "instagram": None,
            "twitter": None,
            "website": None
        },
        "verified": False,
        "followers": 0,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    # Insert user
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    # Return user and token
    user_doc["id"] = user_id
    user_doc.pop("password")
    user_doc.pop("_id", None)
    
    return {
        "user": user_doc,
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=dict)
async def login(login_data: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Login user"""
    # Find user by email
    user = await db.users.find_one({"email": login_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id})
    
    # Return user and token
    user["id"] = user_id
    user.pop("password")
    user.pop("_id")
    
    return {
        "user": user,
        "access_token": access_token,
        "token_type": "bearer"
    }

async def get_current_user_with_db(credentials = Depends(security)):
    """Get current user with database dependency"""
    db = await get_db()
    return await get_current_user(credentials, db)

@router.get("/me", response_model=UserResponse)
async def get_current_user_route(current_user = Depends(get_current_user_with_db)):
    """Get current authenticated user"""
    user = current_user.copy()
    user["id"] = str(user["_id"])
    user.pop("password")
    user.pop("_id")
    return user
