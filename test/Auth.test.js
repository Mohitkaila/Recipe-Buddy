const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');

describe("Auth Middleware", () => {
    let req, res, next;

    beforeEach(() => {
        req = { header: jest.fn() };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
    });

    test("should return 401 if no token is provided", () => {
        req.header.mockReturnValue(null);

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Access denied. No token provided." });
    });

    test("should return 400 if token is invalid", () => {
        req.header.mockReturnValue("Bearer invalid_token");

        jest.spyOn(jwt, "verify").mockImplementation(() => {
            throw new Error("Invalid token");
        });

        authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid token." });
    });

    test("should attach user to req and call next() if token is valid", () => {
        const userPayload = { id: "123", email: "test@example.com" };
        req.header.mockReturnValue("Bearer valid_token");

        jest.spyOn(jwt, "verify").mockReturnValue(userPayload);

        authMiddleware(req, res, next);

        expect(req.user).toEqual(userPayload);
        expect(next).toHaveBeenCalled();
    });
});
