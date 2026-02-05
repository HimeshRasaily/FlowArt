#!/usr/bin/env python3
"""
FlowArt Backend API Testing Suite
Tests all authentication and user endpoints
"""

import requests
import json
import sys
from typing import Dict, Any, Optional

# Base URL from frontend .env
BASE_URL = "https://flowart-clone.preview.emergentagent.com"

class FlowArtAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.access_token = None
        self.test_user_id = None
        self.results = []
        
    def log_result(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if not success or response_data:
            print(f"   Details: {details}")
            if response_data:
                print(f"   Response: {json.dumps(response_data, indent=2, default=str)}")
        print()
        
        self.results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'response': response_data
        })
    
    def test_register(self) -> bool:
        """Test user registration"""
        test_name = "POST /api/auth/register"
        
        try:
            payload = {
                "name": "Testing User",
                "email": "testing@flowart.app", 
                "password": "password123"
            }
            
            response = self.session.post(
                f"{self.base_url}/api/auth/register",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 201:
                data = response.json()
                if "user" in data and "access_token" in data:
                    self.access_token = data["access_token"]
                    self.test_user_id = data["user"].get("id")
                    self.log_result(test_name, True, "User registered successfully", data)
                    return True
                else:
                    self.log_result(test_name, False, "Missing user or access_token in response", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_login(self) -> bool:
        """Test user login"""
        test_name = "POST /api/auth/login"
        
        try:
            payload = {
                "email": "testing@flowart.app",
                "password": "password123"
            }
            
            response = self.session.post(
                f"{self.base_url}/api/auth/login",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if "user" in data and "access_token" in data:
                    self.access_token = data["access_token"]
                    self.log_result(test_name, True, "User logged in successfully", data)
                    return True
                else:
                    self.log_result(test_name, False, "Missing user or access_token in response", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_get_me(self) -> bool:
        """Test get current user"""
        test_name = "GET /api/auth/me"
        
        if not self.access_token:
            self.log_result(test_name, False, "No access token available")
            return False
        
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json"
            }
            
            response = self.session.get(
                f"{self.base_url}/api/auth/me",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "email" in data:
                    self.log_result(test_name, True, "Current user retrieved successfully", data)
                    return True
                else:
                    self.log_result(test_name, False, "Missing required fields in user response", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_get_all_users(self) -> bool:
        """Test get all users"""
        test_name = "GET /api/users"
        
        try:
            response = self.session.get(f"{self.base_url}/api/users")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) > 0:
                        # Check if users have required fields
                        user = data[0]
                        required_fields = ["id", "name", "username", "email", "bio", "avatar"]
                        missing_fields = [field for field in required_fields if field not in user]
                        
                        if not missing_fields:
                            self.log_result(test_name, True, f"Retrieved {len(data)} users successfully", {"count": len(data), "sample_user": user})
                            return True
                        else:
                            self.log_result(test_name, False, f"Missing required fields: {missing_fields}", user)
                            return False
                    else:
                        self.log_result(test_name, True, "Retrieved empty user list", {"count": 0})
                        return True
                else:
                    self.log_result(test_name, False, "Response is not a list", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_filter_by_medium(self) -> bool:
        """Test filter users by medium"""
        test_name = "GET /api/users?medium=Digital"
        
        try:
            response = self.session.get(f"{self.base_url}/api/users?medium=Digital")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if all users have Digital medium
                    digital_users = [user for user in data if user.get("medium") == "Digital"]
                    if len(digital_users) == len(data):
                        self.log_result(test_name, True, f"Retrieved {len(data)} Digital artists", {"count": len(data)})
                        return True
                    else:
                        self.log_result(test_name, False, f"Filter not working properly. Expected all Digital, got mixed", data)
                        return False
                else:
                    self.log_result(test_name, False, "Response is not a list", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_filter_by_experience(self) -> bool:
        """Test filter users by experience"""
        test_name = "GET /api/users?experience=Professional"
        
        try:
            response = self.session.get(f"{self.base_url}/api/users?experience=Professional")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if all users have Professional experience
                    professional_users = [user for user in data if user.get("experience") == "Professional"]
                    if len(professional_users) == len(data):
                        self.log_result(test_name, True, f"Retrieved {len(data)} Professional artists", {"count": len(data)})
                        return True
                    else:
                        self.log_result(test_name, False, f"Filter not working properly. Expected all Professional, got mixed", data)
                        return False
                else:
                    self.log_result(test_name, False, "Response is not a list", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_search_users(self) -> bool:
        """Test search users by name"""
        test_name = "GET /api/users?search=elena"
        
        try:
            response = self.session.get(f"{self.base_url}/api/users?search=elena")
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check if any user contains "elena" in name
                    elena_users = [user for user in data if "elena" in user.get("name", "").lower()]
                    if len(elena_users) > 0:
                        self.log_result(test_name, True, f"Found {len(elena_users)} users matching 'elena'", {"count": len(elena_users), "users": elena_users})
                        return True
                    else:
                        self.log_result(test_name, True, "No users found matching 'elena' (this is acceptable)", {"count": 0})
                        return True
                else:
                    self.log_result(test_name, False, "Response is not a list", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def test_get_specific_user(self) -> bool:
        """Test get specific user by ID"""
        test_name = "GET /api/users/:id"
        
        # First get a user ID from the users list
        try:
            response = self.session.get(f"{self.base_url}/api/users")
            if response.status_code != 200:
                self.log_result(test_name, False, "Could not get users list to find a user ID")
                return False
            
            users = response.json()
            if not users or len(users) == 0:
                self.log_result(test_name, False, "No users available to test specific user endpoint")
                return False
            
            user_id = users[0]["id"]
            
            # Now test getting specific user
            response = self.session.get(f"{self.base_url}/api/users/{user_id}")
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["id"] == user_id:
                    self.log_result(test_name, True, f"Retrieved specific user successfully", data)
                    return True
                else:
                    self.log_result(test_name, False, "User ID mismatch or missing ID field", data)
                    return False
            else:
                self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting FlowArt Backend API Tests")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)
        
        # Authentication tests
        print("🔐 AUTHENTICATION TESTS")
        print("-" * 30)
        self.test_register()
        self.test_login()
        self.test_get_me()
        
        # User endpoint tests
        print("👥 USER ENDPOINT TESTS")
        print("-" * 30)
        self.test_get_all_users()
        self.test_filter_by_medium()
        self.test_filter_by_experience()
        self.test_search_users()
        self.test_get_specific_user()
        
        # Summary
        print("📊 TEST SUMMARY")
        print("=" * 60)
        passed = sum(1 for result in self.results if result['success'])
        total = len(self.results)
        print(f"Passed: {passed}/{total}")
        
        if passed == total:
            print("🎉 All tests passed!")
        else:
            print("⚠️  Some tests failed. Check details above.")
            failed_tests = [result['test'] for result in self.results if not result['success']]
            print(f"Failed tests: {', '.join(failed_tests)}")
        
        return passed == total

if __name__ == "__main__":
    tester = FlowArtAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)