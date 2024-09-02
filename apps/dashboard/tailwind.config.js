// Import the base configuration
import baseConfig from "@galvatron/ui/tailwind.config";

// Extend or override the base configuration
export default {
  ...baseConfig,
  // Add or override specific configurations for the dashboard app
  theme: {
    extend: {
      colors: {
        customColor: "#123456",
      },
    },
  },
  // Add any other custom configurations needed for the dashboard app
};
