import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from utils.auth import get_password_hash
import os
from dotenv import load_dotenv

load_dotenv()

# Seed data - 10 high-quality artist profiles
SEED_USERS = [
    {
        "name": "Elena Rodriguez",
        "username": "elena_creates",
        "email": "elena@flowart.demo",
        "password": "demo123",
        "bio": "Digital artist exploring the intersection of nature and technology. Creating immersive experiences through generative art.",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1200&h=400&fit=crop",
        "location": "Barcelona, Spain",
        "medium": "Digital",
        "experience": "Professional",
        "social": {
            "instagram": "@elena_creates",
            "twitter": "@elena_art",
            "website": "elenarodriguez.art"
        },
        "verified": True,
        "followers": 12400
    },
    {
        "name": "Marcus Chen",
        "username": "marcus_sculptor",
        "email": "marcus@flowart.demo",
        "password": "demo123",
        "bio": "Contemporary sculptor working with sustainable materials. Pushing boundaries of form and space.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=400&fit=crop",
        "location": "Berlin, Germany",
        "medium": "Sculpture",
        "experience": "Professional",
        "social": {
            "instagram": "@marcussculpts",
            "website": "marcuschen.studio"
        },
        "verified": True,
        "followers": 8900
    },
    {
        "name": "Aisha Patel",
        "username": "aisha_canvas",
        "email": "aisha@flowart.demo",
        "password": "demo123",
        "bio": "Abstract expressionist painter. Colors are my language, canvas is my voice.",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=400&fit=crop",
        "location": "Mumbai, India",
        "medium": "Canvas",
        "experience": "Emerging",
        "social": {
            "instagram": "@aishapaints",
            "twitter": "@aisha_art"
        },
        "verified": False,
        "followers": 3200
    },
    {
        "name": "Sophie Laurent",
        "username": "sophie_digital",
        "email": "sophie@flowart.demo",
        "password": "demo123",
        "bio": "New media artist and creative technologist. Building worlds through code and imagination.",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1200&h=400&fit=crop",
        "location": "Paris, France",
        "medium": "Digital",
        "experience": "Professional",
        "social": {
            "instagram": "@sophie_laurent",
            "website": "sophielaurent.digital"
        },
        "verified": True,
        "followers": 15600
    },
    {
        "name": "Jamal Washington",
        "username": "jamal_mixed",
        "email": "jamal@flowart.demo",
        "password": "demo123",
        "bio": "Mixed media artist telling stories through collage and found objects. Every piece has a narrative.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&h=400&fit=crop",
        "location": "Brooklyn, NY",
        "medium": "Canvas",
        "experience": "Mid-Career",
        "social": {
            "instagram": "@jamal_creates",
            "twitter": "@jamalwash"
        },
        "verified": False,
        "followers": 5700
    },
    {
        "name": "Yuki Tanaka",
        "username": "yuki_ceramic",
        "email": "yuki@flowart.demo",
        "password": "demo123",
        "bio": "Ceramic artist blending traditional Japanese techniques with modern minimalism.",
        "avatar": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=400&fit=crop",
        "location": "Kyoto, Japan",
        "medium": "Sculpture",
        "experience": "Professional",
        "social": {
            "instagram": "@yuki_ceramics",
            "website": "yukitanaka.jp"
        },
        "verified": True,
        "followers": 11200
    },
    {
        "name": "Isabella Santos",
        "username": "bella_art",
        "email": "isabella@flowart.demo",
        "password": "demo123",
        "bio": "Brazilian contemporary artist. Vibrant colors and bold expressions define my work.",
        "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop",
        "location": "São Paulo, Brazil",
        "medium": "Canvas",
        "experience": "Professional",
        "social": {
            "instagram": "@bella_creates",
            "website": "isabellasantos.art"
        },
        "verified": True,
        "followers": 9800
    },
    {
        "name": "David Kim",
        "username": "david_digital",
        "email": "david@flowart.demo",
        "password": "demo123",
        "bio": "Digital sculptor and 3D artist. Creating immersive virtual installations.",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&h=400&fit=crop",
        "location": "Seoul, South Korea",
        "medium": "Digital",
        "experience": "Mid-Career",
        "social": {
            "instagram": "@david_3d",
            "twitter": "@davidkim_art"
        },
        "verified": False,
        "followers": 6400
    },
    {
        "name": "Olivia Moore",
        "username": "olivia_photo",
        "email": "olivia@flowart.demo",
        "password": "demo123",
        "bio": "Fine art photographer capturing raw emotion and human connection.",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop",
        "location": "London, UK",
        "medium": "Digital",
        "experience": "Emerging",
        "social": {
            "instagram": "@olivia_lens",
            "website": "oliviamoore.photo"
        },
        "verified": False,
        "followers": 4200
    },
    {
        "name": "Rafael Martinez",
        "username": "rafael_sculptor",
        "email": "rafael@flowart.demo",
        "password": "demo123",
        "bio": "Metal sculptor creating large-scale public installations. Art for the people.",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop",
        "coverImage": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=400&fit=crop",
        "location": "Mexico City, Mexico",
        "medium": "Sculpture",
        "experience": "Professional",
        "social": {
            "instagram": "@rafael_steel",
            "twitter": "@rafaelmartinez"
        },
        "verified": True,
        "followers": 13500
    }
]

async def seed_database():
    """Seed the database with initial artist profiles"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Check if users already exist
    existing_count = await db.users.count_documents({})
    if existing_count > 0:
        print(f"✓ Database already has {existing_count} users. Skipping seed.")
        return
    
    print("Seeding database with artist profiles...")
    
    # Insert users
    users_to_insert = []
    for user_data in SEED_USERS:
        user_doc = user_data.copy()
        user_doc['password'] = get_password_hash(user_data['password'])
        user_doc['createdAt'] = datetime.utcnow()
        user_doc['updatedAt'] = datetime.utcnow()
        users_to_insert.append(user_doc)
    
    result = await db.users.insert_many(users_to_insert)
    print(f"✓ Successfully seeded {len(result.inserted_ids)} artist profiles!")
    
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("username", unique=True)
    print("✓ Created database indexes")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
