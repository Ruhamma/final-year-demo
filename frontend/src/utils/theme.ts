import type { MantineThemeOverride } from "@mantine/core";

export const theme: Partial<MantineThemeOverride> = {
  defaultRadius: "sm",
  primaryColor: "primary",
  primaryShade: 7,
  breakpoints: {
    xs: "412px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  colors: {
    primary: [
      "#FFFCEA",
      "#606C38",
      "#d3eac8",
      "#afd89d",
      "#82bd69",
      "#EED7B7",
      "#BC6C25",
      "#1D8E3F",
      "#345427",
      "#2b4522",
    ],
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 412,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
    },
    Button: {
      defaultProps: {
        size: "sm",
        backgroundColor: "red",
      },
      styles: {
        section: {
          marginRight: 4,
          marginLeft: 1,
          padding: 2,
        },
      },
    },

    Input: {
      defaultProps: {
        size: "sm",
      },
    },
    TextInput: {
      defaultProps: {
        size: "sm",
      },
    },
    NumberInput: {
      defaultProps: {
        size: "sm",
      },
    },
    Select: {
      defaultProps: {
        size: "sm",
      },
    },
    PasswordInput: {
      defaultProps: {
        size: "sm",
      },
    },
    Breadcrumbs: {
      styles: {
        breadcrumb: {
          fontSize: "14px",
        },
      },
    },
    AppShell: {
      styles: {
        main: {
          backgroundColor: "#F3F4F6",
        },
        header: {
          height: 40,
        },
      },
    },
  },
};
