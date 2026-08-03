/**
 * Verbatim homepage copy, supplied by the business and stored here as
 * structured data (not rewritten) so the reusable homepage template never
 * drifts from the exact wording, order, and punctuation supplied.
 */

export interface HomeContentItem {
  title: string;
  description: string;
}

export interface HomeProviderBlock {
  heading: string;
  providerSlug: string;
  paragraphs: string[];
}

export interface HomeStep {
  title: string;
  description: string;
}

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export const homeContent = {
  hero: {
    h1: "Welcome to CloudCreda – Your Trusted Destination for Verified Cloud Accounts",
    tagline: "Unlock the Power of Cloud Computing with Premium Verified Accounts",
    intro: [
      "In today's rapidly evolving digital landscape, having access to reliable and high-performance cloud infrastructure is no longer a luxury— it is an absolute necessity. Whether you are a developer looking to deploy applications, a startup founder aiming to scale your operations, an entrepreneur launching an e-commerce platform, or an enterprise seeking robust IT solutions, the right cloud account can make all the difference in your success journey.",
      "Welcome to CloudCreda, your one-stop destination for purchasing premium, verified, and fully functional cloud accounts from the world's leading cloud service providers. We understand the challenges that come with setting up cloud accounts— lengthy verification processes, identity checks, credit card requirements, and frustrating delays. That is exactly why we exist. We eliminate all these hurdles and provide you with instant access to the cloud platforms you need to build, deploy, and scale your digital solutions.",
      "With years of experience in the cloud industry and thousands of satisfied customers worldwide, CloudCreda has established itself as a trusted name in the cloud account marketplace. Our commitment to quality, security, and customer satisfaction sets us apart from the competition. When you choose us, you are not just purchasing an account— you are gaining a reliable partner in your cloud journey.",
    ],
  },
  whyChoose: {
    heading: "Why Choose CloudCreda?",
    items: [
      {
        title: "Verified and Authentic Accounts",
        description:
          "Every account we offer goes through our rigorous verification process. We ensure that all accounts are 100% genuine, fully functional, and ready for immediate use. You never have to worry about fake or compromised accounts when you buy from us.",
      },
      {
        title: "Instant Delivery",
        description:
          "We understand that time is money. That is why we prioritize fast delivery, with accounts delivered within 30 minutes to a maximum of 24 hours after purchase. Start working on your projects immediately without any unnecessary delays.",
      },
      {
        title: "24/7 Customer Support",
        description:
          "Our dedicated support team is available around the clock to assist with any issues or inquiries. Whether you need help with account access, setup guidance, or technical support, we are always here to help.",
      },
      {
        title: "Competitive Pricing",
        description:
          "We offer premium cloud accounts at affordable prices, making them accessible to individuals, startups, and enterprises alike. Our transparent pricing structure ensures you get the best value for your investment.",
      },
      {
        title: "Replacement Guarantee",
        description:
          "We stand behind the quality of our accounts. If you experience any issues with your account, we provide a replacement guarantee to ensure your complete satisfaction.",
      },
      {
        title: "Secure Transactions",
        description:
          "Your security is our priority. We use advanced encryption and secure payment gateways to protect your personal and financial information.",
      },
    ] satisfies HomeContentItem[],
  },
  providersSection: {
    heading: "Our Extensive Range of Cloud Accounts",
    intro:
      "At CloudCreda, we offer a comprehensive selection of verified cloud accounts from the world's leading cloud service providers. Whether you are looking for enterprise-grade infrastructure, AI-powered solutions, or affordable VPS hosting, we have the perfect account for your needs. Explore our wide range of cloud accounts below:",
    providers: [
      {
        heading: "Buy Amazon AWS Account – Amazon Web Services",
        providerSlug: "aws",
        paragraphs: [
          "Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally. When you Buy Amazon AWS Account from CloudCreda, you gain access to a vast ecosystem of cloud services including computing power, storage, databases, machine learning, analytics, and more.",
          "AWS is the preferred choice for businesses of all sizes, from startups to Fortune 500 companies, due to its scalability, reliability, and extensive service portfolio. Our verified AWS accounts come with active billing, full service access, and are available in multiple regions including US, UK, Australia, and more. Whether you are hosting websites, running enterprise applications, or building AI-powered solutions, an AWS account from CloudCreda provides the perfect foundation for your cloud journey.",
        ],
      },
      {
        heading: "Buy Google Cloud Platform Account – Google Cloud",
        providerSlug: "google-cloud",
        paragraphs: [
          "Google Cloud Platform (GCP) is Google's suite of cloud computing services that runs on the same infrastructure that Google uses for its own end-user products like Google Search, Gmail, and YouTube. When you Buy Google Cloud Platform Account from CloudCreda, you gain access to Google's powerful cloud infrastructure, including advanced AI and machine learning capabilities, big data analytics, and enterprise-grade security.",
          "GCP is renowned for its cutting-edge technologies including TensorFlow, BigQuery, and Kubernetes. Our verified GCP accounts come with preloaded credits, active billing, and full access to all services. Whether you are a data scientist, developer, or enterprise, a Google Cloud account from CloudCreda empowers you to innovate and scale with confidence.",
        ],
      },
      {
        heading: "Buy Microsoft Azure Cloud Account – Microsoft Azure",
        providerSlug: "azure",
        paragraphs: [
          "Microsoft Azure is a comprehensive cloud computing platform that provides a wide range of services including computing, analytics, storage, and networking. When you Buy Microsoft Azure Cloud Account from CloudCreda, you gain access to Microsoft's global cloud infrastructure, seamlessly integrating with other Microsoft products and services.",
          "Azure is trusted by enterprises worldwide for its hybrid cloud capabilities, enterprise-grade security, and extensive compliance certifications. Our verified Azure accounts come with preloaded credits, active billing, and full access to all services. Whether you are migrating existing workloads, building new applications, or leveraging AI capabilities, an Azure account from CloudCreda is your gateway to enterprise cloud excellence.",
        ],
      },
      {
        heading: "Buy DigitalOcean Droplet Account – DigitalOcean",
        providerSlug: "digitalocean",
        paragraphs: [
          "DigitalOcean is a leading cloud hosting provider known for its simplicity, affordability, and developer-friendly approach. When you Buy DigitalOcean Droplet Account from CloudCreda, you gain access to high-performance virtual private servers (VPS) with SSD storage, fast network connections, and global data center locations.",
          "DigitalOcean is the preferred choice for developers, startups, and small businesses due to its straightforward pricing, intuitive interface, and powerful Droplet capabilities. Our verified DigitalOcean accounts come with preloaded credits, unlimited Droplet creation, and active billing. Whether you are hosting websites, building applications, or running development environments, a DigitalOcean account from CloudCreda provides the perfect balance of performance and affordability.",
        ],
      },
      {
        heading: "Buy Oracle Cloud Account – Oracle Cloud Infrastructure",
        providerSlug: "oracle-cloud",
        paragraphs: [
          "Oracle Cloud Infrastructure (OCI) is a comprehensive cloud platform that provides high-performance computing, storage, networking, and database services. When you Buy Oracle Cloud Account from CloudCreda, you gain access to Oracle's enterprise-grade infrastructure, including its industry-leading autonomous database capabilities.",
          "Oracle Cloud is trusted by organizations worldwide for its robust security, exceptional performance, and comprehensive service portfolio. Our verified Oracle Cloud accounts come with active billing, full service access, and are available in multiple regions. Whether you are running mission-critical applications, leveraging AI capabilities, or building cloud-native solutions, an Oracle Cloud account from CloudCreda delivers enterprise-grade performance at competitive prices.",
        ],
      },
      {
        heading: "Buy Vultr Cloud Account – Vultr",
        providerSlug: "vultr",
        paragraphs: [
          "Vultr is a global cloud hosting provider known for its high-performance virtual private servers (VPS) with SSD storage, fast network connections, and rapid deployment times. When you Buy Vultr Cloud Account from CloudCreda, you gain access to Vultr's global infrastructure with data centers in over 30 locations worldwide.",
          "Vultr is the preferred choice for developers and businesses seeking reliable, affordable cloud hosting with exceptional performance. Our verified Vultr accounts come with preloaded credits, unlimited instance creation, and active billing. Whether you are hosting websites, running applications, or managing development projects, a Vultr account from CloudCreda provides the speed and reliability you need.",
        ],
      },
      {
        heading: "Buy Linode Cloud Account – Linode",
        providerSlug: "linode",
        paragraphs: [
          "Linode is a trusted cloud hosting provider offering powerful virtual private servers (VPS) with SSD storage, global data center locations, and developer-friendly tools. When you Buy Linode Cloud Account from CloudCreda, you gain access to Linode's robust infrastructure with full root access and unlimited VPS creation capabilities.",
          "Linode is renowned for its simplicity, reliability, and exceptional customer support. Our verified Linode accounts come with preloaded credits, Port 25 enabled, and active billing. Whether you are hosting websites, managing email servers, or building scalable applications, a Linode account from CloudCreda provides the flexibility and performance you need to succeed.",
        ],
      },
      {
        heading: "Buy Hetzner Cloud Account – Hetzner",
        providerSlug: "hetzner-cloud",
        paragraphs: [
          "Hetzner is a well-established European cloud hosting provider known for its affordable, reliable, and high-performance hosting solutions. When you Buy Hetzner Cloud Account from CloudCreda, you gain access to Hetzner's robust infrastructure with data centers in Germany, Finland, and the United States.",
          "Hetzner is trusted by developers and businesses worldwide for its exceptional value, transparent pricing, and dependable performance. Our verified Hetzner accounts come with full identity verification, active billing, and complete service access. Whether you are running web applications, managing databases, or building cloud solutions, a Hetzner account from CloudCreda delivers enterprise-grade hosting at budget-friendly prices.",
        ],
      },
      {
        heading: "Buy IBM Cloud Account – IBM Cloud",
        providerSlug: "ibm-cloud",
        paragraphs: [
          "IBM Cloud is a comprehensive cloud platform that combines Infrastructure as a Service (IaaS) with Platform as a Service (PaaS), offering advanced capabilities including Watson AI, Kubernetes, and enterprise hybrid cloud solutions. When you Buy IBM Cloud Account from CloudCreda, you gain access to IBM's enterprise-grade infrastructure and cutting-edge AI technologies.",
          "IBM Cloud is trusted by Fortune 500 companies and organizations worldwide for its robust security, exceptional performance, and innovative capabilities. Our verified IBM Cloud accounts come with Watson AI access, active billing, and full service access. Whether you are building intelligent applications, leveraging AI capabilities, or deploying enterprise solutions, an IBM Cloud account from CloudCreda empowers you to innovate with confidence.",
        ],
      },
      {
        heading: "Buy Kamatera Cloud Account – Kamatera",
        providerSlug: "kamatera",
        paragraphs: [
          "Kamatera is a global cloud infrastructure provider offering high-performance virtual private servers (VPS), cloud hosting, and enterprise-grade solutions with data centers worldwide. When you Buy Kamatera Cloud Account from CloudCreda, you gain access to Kamatera's powerful infrastructure with full service access and global region availability.",
          "Kamatera is the preferred choice for businesses seeking flexible, scalable cloud solutions with exceptional performance. Our verified Kamatera accounts come with free trial credits, active billing, and full access to all services. Whether you are evaluating the platform, running short-lived workloads, or prototyping applications, a Kamatera account from CloudCreda provides the perfect starting point for your cloud journey.",
        ],
      },
      {
        heading: "Buy Alibaba Cloud Account – Alibaba Cloud",
        providerSlug: "alibaba-cloud",
        paragraphs: [
          "Alibaba Cloud (also known as Aliyun) is the cloud computing arm of Alibaba Group and one of the world's largest cloud service providers. When you Buy Alibaba Cloud Account from CloudCreda, you gain access to Alibaba's comprehensive cloud services including computing, storage, databases, networking, security, and AI capabilities.",
          "Alibaba Cloud is the preferred choice for businesses operating in Asia and globally, offering exceptional performance, competitive pricing, and a wide range of services. Our verified Alibaba Cloud accounts come with active billing, full service access, and global region availability. Whether you are hosting websites, analyzing big data, or building AI-powered applications, an Alibaba Cloud account from CloudCreda unlocks global scalability for your business.",
        ],
      },
      {
        heading: "Buy Atlantic Cloud Account – Atlantic",
        providerSlug: "atlantic-net",
        paragraphs: [
          "Atlantic is a trusted cloud infrastructure provider offering high-performance virtual private servers (VPS), managed hosting, and enterprise-grade cloud solutions with data centers in the United States, Europe, and Asia. When you Buy Atlantic Cloud Account from CloudCreda, you gain access to Atlantic's robust infrastructure with full service access and global region availability.",
          "Atlantic is renowned for its reliability, exceptional customer support, and scalable solutions. Our verified Atlantic accounts come with active billing, full service access, and complete verification. Whether you are hosting websites, managing cloud storage, or deploying enterprise applications, an Atlantic account from CloudCreda provides the reliable foundation you need for your digital solutions.",
        ],
      },
    ] satisfies HomeProviderBlock[],
  },
  howItWorks: {
    heading: "How It Works",
    intro: "Purchasing a cloud account from CloudCreda is simple, fast, and secure:",
    steps: [
      {
        title: "Browse Our Collection",
        description:
          "Explore our extensive range of verified cloud accounts from the world's leading cloud service providers. Choose the account that best suits your needs.",
      },
      {
        title: "Place Your Order",
        description:
          "Select your desired account, add it to your cart, and proceed to checkout. Indicate how many accounts you need and provide any specific requirements.",
      },
      {
        title: "Complete Payment",
        description: "Make your payment through our secure payment gateway. We accept multiple payment methods for your convenience.",
      },
      {
        title: "Receive Your Account",
        description:
          "Your account details, including login information, will be delivered to you promptly within 30 minutes to a maximum of 24 hours.",
      },
      {
        title: "Start Building",
        description:
          "Log in to your account and start using cloud services immediately. Deploy servers, build applications, and scale your digital solutions without any delays.",
      },
    ] satisfies HomeStep[],
  },
  cloudBenefits: {
    heading: "Why Cloud Computing Matters for Your Business",
    intro:
      "Cloud computing has fundamentally transformed how businesses operate in the digital age. Here is why having the right cloud infrastructure is essential for your success:",
    items: [
      {
        title: "Scalability",
        description:
          "Cloud services allow you to scale resources up or down based on demand. This flexibility ensures you can handle traffic spikes, seasonal variations, and business growth without investing in expensive hardware.",
      },
      {
        title: "Cost Efficiency",
        description:
          "With pay-as-you-go pricing models, you only pay for the resources you actually use. This eliminates the need for large upfront investments and helps you optimize your IT budget.",
      },
      {
        title: "Global Reach",
        description:
          "Cloud providers operate data centers worldwide, allowing you to deploy applications closer to your users for improved performance and reduced latency.",
      },
      {
        title: "Security",
        description:
          "Leading cloud providers invest heavily in security, offering advanced features including encryption, identity management, and threat detection to protect your data and applications.",
      },
      {
        title: "Innovation",
        description:
          "Cloud platforms provide access to cutting-edge technologies including AI, machine learning, big data analytics, and IoT capabilities, enabling you to innovate and stay ahead of the competition.",
      },
      {
        title: "Reliability",
        description:
          "Cloud providers offer high availability guarantees, automated backups, and disaster recovery capabilities to ensure your applications remain accessible and your data remains protected.",
      },
    ] satisfies HomeContentItem[],
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "Are your cloud accounts verified?",
        answer:
          "Yes, every account we offer goes through our rigorous verification process. All accounts are 100% genuine, fully functional, and ready for immediate use.",
      },
      {
        question: "How quickly will I receive my account?",
        answer: "Accounts are delivered within 30 minutes to a maximum of 24 hours after your order is confirmed.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept multiple secure payment methods, including bank transfers, cryptocurrency, and other established payment platforms.",
      },
      {
        question: "Do you offer customer support?",
        answer: "Yes, we offer 24/7 customer support to assist with any issues or inquiries.",
      },
      {
        question: "What if my account has issues?",
        answer:
          "We offer a replacement guarantee. If you experience any issues with your account, contact our support team and we will provide a replacement immediately.",
      },
      {
        question: "Can I use my own payment method after acquiring the account?",
        answer: "Absolutely. Once you have access to the account, you can fully update the payment method to your own for all future billing.",
      },
      {
        question: "Are your accounts suitable for production use?",
        answer: "Yes, our accounts are fully functional and suitable for both development and production workloads.",
      },
      {
        question: "Do you offer bulk account purchases?",
        answer: "Yes, we offer bulk account packages at discounted prices for businesses and organizations that need multiple accounts.",
      },
    ] satisfies HomeFaqItem[],
  },
  finalCta: {
    heading: "Get Started Today!",
    paragraphs: [
      "Do not let lengthy verification processes and account setup delays hold you back from leveraging the power of cloud computing. With CloudCreda, you can Buy Amazon AWS Account, Buy Google Cloud Platform Account, Buy Microsoft Azure Cloud Account, Buy DigitalOcean Droplet Account, Buy Oracle Cloud Account, Buy Vultr Cloud Account, Buy Linode Cloud Account, Buy Hetzner Cloud Account, Buy IBM Cloud Account, Buy Kamatera Cloud Account, Buy Alibaba Cloud Account, and Buy Atlantic Cloud Account instantly with full verification and immediate access.",
      "Join thousands of satisfied customers who have trusted CloudCreda for their cloud account needs. Experience the convenience, reliability, and affordability that sets us apart. Whether you are a developer, entrepreneur, startup, or enterprise, we have the perfect cloud account to power your digital journey.",
      "Ready to get started? Browse our collection today and unlock the full potential of cloud computing for your business. Your verified cloud account is just a click away!",
    ],
    tagline:
      "CloudCreda – Your trusted partner for verified cloud accounts from the world's leading cloud service providers. Experience the future of cloud computing today!",
  },
};
