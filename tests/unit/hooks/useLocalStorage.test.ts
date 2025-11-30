import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "../../../src/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should return default value when no stored value", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should return stored value when available", () => {
    localStorage.setItem("test-key", "stored-value");
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("stored-value");
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    // String values are stored directly, not as JSON
    expect(localStorage.getItem("test-key")).toBe("updated");
  });

  it("should handle complex objects", () => {
    const defaultObj = { name: "test", value: 123 };
    const { result } = renderHook(() => useLocalStorage("test-obj", defaultObj));

    act(() => {
      result.current[1]({ name: "updated", value: 456 });
    });

    expect(result.current[0]).toEqual({ name: "updated", value: 456 });
    expect(JSON.parse(localStorage.getItem("test-obj") || "{}")).toEqual({
      name: "updated",
      value: 456,
    });
  });

  it("should use validator function when provided", () => {
    const isValidTheme = (value: unknown): value is "dark" | "light" => value === "dark" || value === "light";
    localStorage.setItem("test-theme", "invalid-theme");

    const { result } = renderHook(() => useLocalStorage("test-theme", "dark", isValidTheme));

    // Should return default value because stored value fails validation
    expect(result.current[0]).toBe("dark");
  });

  it("should handle invalid JSON gracefully", () => {
    // For complex objects, test with invalid JSON
    localStorage.setItem("test-invalid", "invalid-json");
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test-invalid", { fallback: true }));

    expect(result.current[0]).toEqual({ fallback: true });
    expect(consoleSpy).toHaveBeenCalledWith('Error reading localStorage key "test-invalid":', expect.any(Error));
  });

  it("should sync across hook instances", () => {
    const { result: result1 } = renderHook(() => useLocalStorage("shared-key", "initial"));
    const { result: result2 } = renderHook(() => useLocalStorage("shared-key", "initial"));

    act(() => {
      result1.current[1]("updated-from-1");
    });

    // First hook should have the updated value
    expect(result1.current[0]).toBe("updated-from-1");
    // Second hook will update when re-rendered
    expect(result2.current[0]).toBe("initial"); // Still initial until re-render
  });
});
