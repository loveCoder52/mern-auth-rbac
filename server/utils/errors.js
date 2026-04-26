/**
 * Centralized Error Handling
 * Standardized error responses across the application
 */

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const handleError = (error, res) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'An unexpected error occurred';

    console.error(`[Error] ${statusCode}: ${message}`);

    return res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { error: error.toString() })
    });
};

// Specific error classes
export class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400);
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message = 'Access denied') {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource already exists') {
        super(message, 409);
    }
}
