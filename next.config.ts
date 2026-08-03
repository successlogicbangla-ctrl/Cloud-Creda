import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // AWS's provider page moved to a dedicated landing page. Add one entry
      // per provider here as each gets its own /cloud-accounts/{slug} page.
      {
        source: "/providers/aws",
        destination: "/cloud-accounts/buy-aws-account",
        permanent: true,
      },
      {
        source: "/providers/google-cloud",
        destination: "/cloud-accounts/buy-google-cloud-platform-account",
        permanent: true,
      },
      {
        source: "/providers/azure",
        destination: "/cloud-accounts/buy-microsoft-azure-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/digitalocean",
        destination: "/cloud-accounts/buy-digitalocean-droplet-account",
        permanent: true,
      },
      {
        source: "/providers/oracle-cloud",
        destination: "/cloud-accounts/buy-oracle-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/vultr",
        destination: "/cloud-accounts/buy-vultr-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/linode",
        destination: "/cloud-accounts/buy-linode-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/hetzner-cloud",
        destination: "/cloud-accounts/buy-hetzner-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/ibm-cloud",
        destination: "/cloud-accounts/buy-ibm-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/kamatera",
        destination: "/cloud-accounts/buy-kamatera-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/alibaba-cloud",
        destination: "/cloud-accounts/buy-alibaba-cloud-account",
        permanent: true,
      },
      {
        source: "/providers/atlantic-net",
        destination: "/cloud-accounts/buy-atlantic-net-cloud-account",
        permanent: true,
      },
      // The Guides section was renamed to Compare and redesigned into a
      // provider-comparison hub; the original guide articles moved to
      // /articles so their content and URLs keep working under a name that
      // no longer collides with the new /compare feature.
      {
        source: "/guides",
        destination: "/compare",
        permanent: true,
      },
      {
        source: "/guides/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
