USE [test]
GO

CREATE TABLE USER_ (
        user_id INT IDENTITY (1, 1) PRIMARY KEY,
        first_name VARCHAR (255) NOT NULL,
        last_name VARCHAR (255) NOT NULL,
        phone VARCHAR (25),
        email VARCHAR (255) NOT NULL,
        street VARCHAR (255),
        city VARCHAR (50),
        state VARCHAR (25),
        zip_code VARCHAR (5)
);

CREATE TABLE brands (
        brand_id INT IDENTITY (1, 1) PRIMARY KEY,
        brand_name VARCHAR (255) NOT NULL
);

CREATE TABLE categories (
        category_id INT IDENTITY (1, 1) PRIMARY KEY,
        category_name VARCHAR (255) NOT NULL
);

CREATE TABLE Items (
        item_id INT IDENTITY (1, 1) PRIMARY KEY,
        item_name VARCHAR (255) NOT NULL,
        brand_id INT NOT NULL,
        category_id INT NOT NULL,
        model_year SMALLINT NOT NULL,
        list_price DECIMAL (10, 2) NOT NULL,
        FOREIGN KEY (category_id) 
        REFERENCES categories (category_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (brand_id) 
        REFERENCES brands (brand_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Transaction_ (
        transaction_id INT IDENTITY (1, 1) PRIMARY KEY,
        user_id INT,
        transaction_status tinyint NOT NULL,
        transaction_date DATE NOT NULL,         
        FOREIGN KEY (user_id) 
        REFERENCES USER_ (user_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
);


CREATE TABLE Transaction_items(
        transaction_id INT,
        item_id INT,    
        quantity INT NOT NULL,
        list_price DECIMAL (10, 2) NOT NULL,
        discount DECIMAL (4, 2) NOT NULL DEFAULT 0,
        PRIMARY KEY (transaction_id , item_id),
        FOREIGN KEY (transaction_id ) 
        REFERENCES Transaction_  (transaction_id ) 
        ON DELETE CASCADE ON UPDATE CASCADE,    
);
