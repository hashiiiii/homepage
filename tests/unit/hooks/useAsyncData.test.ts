import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAsyncData } from "../../../src/hooks/useAsyncData";

describe("useAsyncData", () => {
  it("should handle successful data fetching", async () => {
    const mockData = { id: 1, name: "Test" };
    const mockFn = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useAsyncData(mockFn));

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    const mockFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useAsyncData(mockFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe("Test error");
  });

  it("should re-fetch when asyncFn changes", async () => {
    const mockFn1 = vi.fn().mockResolvedValue({ value: "test1" });
    const mockFn2 = vi.fn().mockResolvedValue({ value: "test2" });

    const { result, rerender } = renderHook(({ fn }) => useAsyncData(fn), { initialProps: { fn: mockFn1 } });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(mockFn1).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ value: "test1" });

    // Change function
    rerender({ fn: mockFn2 });

    await waitFor(() => {
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
    expect(result.current.data).toEqual({ value: "test2" });
  });

  it("should provide refetch function", async () => {
    const mockFn = vi.fn().mockResolvedValue({ value: "test" });
    const { result } = renderHook(() => useAsyncData(mockFn));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Call refetch
    await act(async () => {
      await result.current.refetch();
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
