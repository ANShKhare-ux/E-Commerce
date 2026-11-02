// =============================================================================
// LUMIÈRE - Production-Ready Structured Logger
// Provides structured, sanitized logging across server and client runtimes
// with automatic credential redaction to prevent secret leakage.
// =============================================================================

type LogLevel = "debug" | "info" | "warn" | "error";

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "secret",
  "key",
  "authorization",
  "phonepe_salt_key",
  "resend_api_key",
  "delhivery_api_token",
  "supabase_service_role_key",
  "cookie",
  "checksum",
  "salt",
]);

function redactSensitiveData(data: unknown, depth = 0, seen = new WeakSet()): unknown {
  if (depth > 6) return "[MaxDepthReached]";
  if (data === null || data === undefined) return data;

  if (typeof data === "string") {
    let sanitizedStr = data;
    // Redact Bearer tokens
    if (/bearer\s+[a-zA-Z0-9_\-\.]+/i.test(sanitizedStr)) {
      sanitizedStr = sanitizedStr.replace(/bearer\s+[a-zA-Z0-9_\-\.]+/gi, "Bearer [REDACTED]");
    }
    // Redact URL sensitive query parameters
    sanitizedStr = sanitizedStr.replace(
      /([?&](?:token|key|secret|password|auth|salt|apiKey|signature)=)[^&\s]+/gi,
      "$1[REDACTED]"
    );
    return sanitizedStr;
  }

  if (typeof data !== "object") {
    return data;
  }

  if (seen.has(data as object)) {
    return "[Circular]";
  }
  seen.add(data as object);

  if (Array.isArray(data)) {
    return data.map((item) => redactSensitiveData(item, depth + 1, seen));
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = redactSensitiveData(value, depth + 1, seen);
    }
  }
  return sanitized;
}

function formatLog(level: LogLevel, message: string, context?: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const safeContext = context ? redactSensitiveData(context) : undefined;
  return JSON.stringify({
    timestamp,
    level: level.toUpperCase(),
    service: "lumiere-store",
    message,
    ...(safeContext ? { context: safeContext } : {}),
  });
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatLog("debug", message, context));
    }
  },

  info(message: string, context?: Record<string, unknown>) {
    console.info(formatLog("info", message, context));
  },

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(formatLog("warn", message, context));
  },

  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    const errObj =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
            ...Object.getOwnPropertyNames(error).reduce((acc, key) => {
              if (key !== "name" && key !== "message" && key !== "stack") {
                acc[key] = (error as any)[key];
              }
              return acc;
            }, {} as Record<string, unknown>),
          }
        : error !== undefined
        ? { raw: String(error) }
        : undefined;

    console.error(
      formatLog("error", message, {
        ...context,
        ...(errObj ? { error: errObj } : {}),
      })
    );
  },
};
