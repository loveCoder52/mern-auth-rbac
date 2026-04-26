import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user'
    },
    // Custom permissions override (if not defined, use role defaults)
    customPermissions: {
        type: [String],
        default: []
    },
    // Organization/Company field for multi-tenant support
    organization: {
        type: String,
        default: 'default'
    },
    // Account verification
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    // Password reset
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0
    },
    // Activity logging
    lastLogin: {
        type: Date,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Index for faster queries
userSchema.index({ email: 1, organization: 1 });

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;