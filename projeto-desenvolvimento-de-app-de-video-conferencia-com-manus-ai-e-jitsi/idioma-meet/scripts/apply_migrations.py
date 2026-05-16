#!/usr/bin/env python3
"""
Script para aplicar migrações do banco de dados manualmente.
Útil quando o Drizzle Kit tem problemas com metadados de migrações.
"""

import os
import sys
import mysql.connector
from mysql.connector import Error

# Database configuration from environment
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "idioma_meet")

def get_connection():
    """Create a database connection."""
    try:
        connection = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        return connection
    except Error as e:
        print(f"Error connecting to database: {e}")
        return None

def create_tables():
    """Create all required tables."""
    connection = get_connection()
    if not connection:
        return False
    
    cursor = connection.cursor()
    
    try:
        # Create user_profiles table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS `user_profiles` (
                `id` int AUTO_INCREMENT NOT NULL,
                `userId` int NOT NULL,
                `nativeLanguage` varchar(10) NOT NULL DEFAULT 'pt',
                `learningLanguages` json NOT NULL,
                `proficiencyLevel` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
                `totalConversations` int NOT NULL DEFAULT 0,
                `totalMinutes` int NOT NULL DEFAULT 0,
                `averageRating` int NOT NULL DEFAULT 0,
                `isProfileComplete` boolean NOT NULL DEFAULT false,
                `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT `user_profiles_id` PRIMARY KEY(`id`)
            )
        """)
        print("✓ Created user_profiles table")
        
        # Create conversations table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS `conversations` (
                `id` int AUTO_INCREMENT NOT NULL,
                `userId1` int NOT NULL,
                `userId2` int NOT NULL,
                `language` varchar(10) NOT NULL,
                `startedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `endedAt` timestamp NULL,
                `durationMinutes` int NOT NULL DEFAULT 0,
                `jitsiRoomId` varchar(255),
                `status` enum('active','completed','cancelled') NOT NULL DEFAULT 'active',
                `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
            )
        """)
        print("✓ Created conversations table")
        
        # Create ratings table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS `ratings` (
                `id` int AUTO_INCREMENT NOT NULL,
                `conversationId` int NOT NULL,
                `ratedByUserId` int NOT NULL,
                `ratedUserId` int NOT NULL,
                `rating` int NOT NULL,
                `comment` text,
                `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
            )
        """)
        print("✓ Created ratings table")
        
        # Create matchmaking_queue table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS `matchmaking_queue` (
                `id` int AUTO_INCREMENT NOT NULL,
                `userId` int NOT NULL,
                `learningLanguage` varchar(10) NOT NULL,
                `proficiencyLevel` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
                `joinedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `status` enum('waiting','matched','cancelled') NOT NULL DEFAULT 'waiting',
                `matchedWithUserId` int,
                CONSTRAINT `matchmaking_queue_id` PRIMARY KEY(`id`)
            )
        """)
        print("✓ Created matchmaking_queue table")
        
        connection.commit()
        print("\n✓ All tables created successfully!")
        return True
        
    except Error as e:
        print(f"Error creating tables: {e}")
        connection.rollback()
        return False
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    print("Applying database migrations...")
    success = create_tables()
    sys.exit(0 if success else 1)
