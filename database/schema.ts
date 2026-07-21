export const CUSTOMER_TABLE = `
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    full_name TEXT NOT NULL,
    phone_number TEXT,
    address TEXT,
    notes TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT,
    deleted_at TEXT
);
`;

export const GARMENT_TABLE = `
CREATE TABLE IF NOT EXISTS garments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,
    category TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

export const SIZE_TABLE = `
CREATE TABLE IF NOT EXISTS sizes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

export const SIZE_MEASUREMENT_TABLE = `
CREATE TABLE IF NOT EXISTS size_measurements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    size_id INTEGER NOT NULL,

    chest REAL,
    arm_length REAL,
    shoulder REAL,
    armscye REAL,
    neck_size REAL,
    back_width REAL,
    waist REAL,
    front_shoulder_to_waist REAL,
    hip REAL,
    waist_to_knee REAL,
    crotch_depth REAL,
    body_rise REAL,
    waist_to_floor REAL,
    nape_to_waist REAL,
    bust REAL,

    FOREIGN KEY(size_id)
        REFERENCES sizes(id)
        ON DELETE CASCADE
);
`;

export const ORDER_TABLE = `
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    customer_id INTEGER NOT NULL,

    order_date TEXT DEFAULT CURRENT_TIMESTAMP,

    due_date TEXT,

    status TEXT DEFAULT 'Pending',

    quantity INTEGER DEFAULT 1,

    total REAL DEFAULT 0,

    notes TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(customer_id)
        REFERENCES customers(id)
        ON DELETE CASCADE
);
`;

export const ITEM_TABLE = `
CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    item_id INTEGER NOT NULL,

    garment_id INTEGER NOT NULL,

    size_id INTEGER,

    material TEXT,

    unit_price REAL,

    remarks TEXT,

    url TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(item_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY(garment_id)
        REFERENCES garments(id),

    FOREIGN KEY(size_id)
        REFERENCES sizes(id)
);
`;
