import "vitest-dom/extend-expect";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock("@clerk/clerk-react", async () => {
  const actual = await vi.importActual("@clerk/clerk-react");
  return {
    ...(actual as Record<string, unknown>),
    useAuth: () => ({
      userId: "123",
    }),
    useUser: () => ({
      isSignedIn: true,
      user: {
        username: "leovoon",
        profileImageUrl: "https://avatars.githubusercontent.com/u/10047099?v=4",
      },
    }),
  };
});
