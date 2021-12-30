module.exports = {
  reactStrictMode: true,

  i18n: {
    locales: ["fa"],
    defaultLocale: "fa",
    domains: [
      {
        domain: "touskaweb.com",
        defaultLocale: "fa",
        // an optional http field can also be used to test
        // locale domains locally with http instead of https
        http: true,
      },
    ],
  },

  images: {
    domains: ["api.touskaweb.com", "touskaweb.com"],
  },

  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
