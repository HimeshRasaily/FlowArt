from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict
from datetime import datetime
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

class SocialLinks(BaseModel):
    instagram: Optional[str] = None
    twitter: Optional[str] = None
    website: Optional[str] = None

class UserBase(BaseModel):
    name: str
    username: str
    email: EmailStr
    bio: Optional[str] = ""
    avatar: Optional[str] = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
    coverImage: Optional[str] = "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop"
    location: Optional[str] = ""
    medium: Optional[str] = "Digital"
    experience: Optional[str] = "Emerging"
    social: Optional[SocialLinks] = Field(default_factory=SocialLinks)
    verified: bool = False
    followers: int = 0

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    username: Optional[str] = None

class UserUpdate(BaseModel):
    bio: Optional[str] = None
    location: Optional[str] = None
    medium: Optional[str] = None
    experience: Optional[str] = None
    social: Optional[SocialLinks] = None
    avatar: Optional[str] = None
    coverImage: Optional[str] = None

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    password: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class UserResponse(UserBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
