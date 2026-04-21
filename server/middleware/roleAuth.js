// Middleware to check if user has required role for RBAC
const roleAuth = (requiredRole) => {
    return (req, res, next) => {
        try {
            // Check if userRole exists (should be set by userAuth middleware)
            if (!req.userRole) {
                return res.json({ success: false, message: "User role not found. Please login again." });
            }

            // Check if user has the required role
            if (req.userRole !== requiredRole) {
                return res.json({ 
                    success: false, 
                    message: `Access denied. Only ${requiredRole} can access this resource.` 
                });
            }

            next();
        } catch (error) {
            return res.json({ success: false, message: error.message });
        }
    };
};

export default roleAuth;
