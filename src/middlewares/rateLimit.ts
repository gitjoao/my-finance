import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Muitas requisições. Tente novamente em instantes." },
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: (req) => {
    const user = String(req.body?.email ?? req.body?.username ?? "")
      .toLowerCase()
      .trim();
    return user ? `login:${user}` : ipKeyGenerator(req.ip ?? "");
  },
  message: {
    message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
  },
});