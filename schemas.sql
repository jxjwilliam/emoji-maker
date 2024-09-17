-- Table: profiles
CREATE TABLE profiles (
    user_id TEXT PRIMARY KEY,
    credits INTEGER DEFAULT 3 NOT NULL,
    tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Table: emojis
CREATE TABLE emojis (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    prompt TEXT NOT NULL,
    likes_count NUMERIC DEFAULT 0,
    creator_user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);