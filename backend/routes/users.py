from fastapi import APIRouter, HTTPException, status, Depends, Query, Request
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import Optional, List
from bson import ObjectId
from datetime import datetime
import re

from models.user import UserResponse, UserUpdate
from utils.dependencies import get_current_user, security

router = APIRouter(prefix="/users", tags=["Users"])

async def get_current_user_with_db(credentials = Depends(security)):
    """Get current user with database dependency"""
    # This will need to be updated to use request.app.state.db
    pass

@router.get("", response_model=List[dict])
async def get_users(
    request: Request,
    medium: Optional[str] = Query(None),
    experience: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: Optional[int] = Query(None)
):
    """Get all users with optional filters"""
    db = request.app.state.db
    query = {}
    
    # Filter by medium
    if medium and medium != "All":
        query["medium"] = medium
    
    # Filter by experience
    if experience and experience != "All":
        query["experience"] = experience
    
    # Search filter
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"username": {"$regex": search, "$options": "i"}},
            {"bio": {"$regex": search, "$options": "i"}}
        ]
    
    # Query users
    cursor = db.users.find(query, {"password": 0})
    
    if limit:
        cursor = cursor.limit(limit)
    
    users = await cursor.to_list(length=1000)
    
    # Convert ObjectId to string
    for user in users:
        user["id"] = str(user["_id"])
        user.pop("_id")
    
    return users

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Get a specific user by ID"""
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID"
        )
    
    user = await db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user["id"] = str(user["_id"])
    user.pop("_id")
    
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user = Depends(get_current_user_with_db),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Update user profile (authenticated)"""
    # Check if user is updating their own profile
    if str(current_user["_id"]) != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this profile"
        )
    
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID"
        )
    
    # Prepare update data
    update_data = user_update.dict(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data to update"
        )
    
    update_data["updatedAt"] = datetime.utcnow()
    
    # Update user
    result = await db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or no changes made"
        )
    
    # Get updated user
    updated_user = await db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    updated_user["id"] = str(updated_user["_id"])
    updated_user.pop("_id")
    
    return updated_user
