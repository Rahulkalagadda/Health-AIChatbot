-- Database Creation Script for SevaSetu Health Chatbot (MySQL/PostgreSQL compatible)

-- 1. Create Database (Manually run this if needed)
-- CREATE DATABASE healthdb;
-- USE healthdb;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255),
    bio TEXT,
    blood_group VARCHAR(10),
    weight VARCHAR(20),
    height VARCHAR(20),
    age VARCHAR(10),
    primary_condition VARCHAR(255),
    language VARCHAR(10) DEFAULT 'en',
    district VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Chat History Table
CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    message TEXT,
    response TEXT,
    language VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    file_url VARCHAR(500),
    summary TEXT,
    ocr_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    patient_name VARCHAR(255),
    facility_name VARCHAR(255),
    appointment_date DATETIME,
    phone_number VARCHAR(20),
    symptoms TEXT,
    status VARCHAR(50) DEFAULT 'Scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Health Alerts Table
CREATE TABLE IF NOT EXISTS health_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    district VARCHAR(100),
    type VARCHAR(100),
    severity VARCHAR(20),
    message TEXT,
    precautions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Schemes Cache Table
CREATE TABLE IF NOT EXISTS schemes_cache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    eligibility TEXT,
    benefits TEXT,
    steps TEXT,
    documents TEXT,
    timeline VARCHAR(100),
    state VARCHAR(100),
    official_link VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 8. Service Providers Table (Hospitals/Clinics)
CREATE TABLE IF NOT EXISTS providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100),
    type VARCHAR(50),
    district VARCHAR(100),
    state VARCHAR(100),
    contact VARCHAR(50)
);

-- 9. Medical Terms Table
CREATE TABLE IF NOT EXISTS medical_terms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    term VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100)
);

-- Performance Indices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_district ON users(district);
CREATE INDEX idx_chat_user_id ON chat_history(user_id);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_alerts_district ON health_alerts(district);
CREATE INDEX idx_schemes_state ON schemes_cache(state);
CREATE INDEX idx_schemes_name ON schemes_cache(name);
CREATE INDEX idx_providers_district ON providers(district);
CREATE INDEX idx_medical_terms_term ON medical_terms(term);
