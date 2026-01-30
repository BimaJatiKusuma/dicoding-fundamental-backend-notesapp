import jwt from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';

const TokenManager = {
    generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
    generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),

    verify: (accessToken) => {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
            return decoded;
        } catch (error) {
            console.log(error);
            throw new InvariantError('Access Token tidak valid');
        }
    },

    verifyRefreshToken: (refreshToken) => {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            return payload;
        } catch (error) {
            console.log(error);
            throw new InvariantError('Refresh token tidak valid');
        }
    }
};

export default TokenManager;