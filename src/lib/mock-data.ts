// Mock data for projects and blog posts

export interface ProjectType {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  gallery: string[];
  tags: string[];
  category: string;
  featured: boolean;
  liveUrl: string;
  githubUrl: string;
  gradientFrom: string;
  gradientTo: string;
  status: 'completed' | 'in-progress';
  createdAt: string;
}

export interface PostType {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  readTime: string;
  createdAt: string;
}

// Project categories
export const projectCategories = [
  'All',
  'Web App',
  'Mobile App',
  'API',
  'E-Commerce',
  'SaaS',
];

// Projects data
export const projects: ProjectType[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    shortDescription: 'A full-featured e-commerce platform with product management, cart, checkout, and payment integration.',
    fullDescription: `This comprehensive e-commerce platform was built from the ground up to handle all aspects of online retail. The platform features a modern, responsive design with a focus on user experience and conversion optimization.

Key features include:
- **Product Management**: Full CRUD operations for products with variants, inventory tracking, and image galleries
- **Shopping Cart**: Persistent cart with real-time updates, discount codes, and shipping calculation
- **Checkout Flow**: Multi-step checkout with address validation and multiple payment options
- **Admin Dashboard**: Complete admin panel for managing orders, products, customers, and analytics
- **Payment Integration**: Stripe and PayPal integration for secure transactions

The platform is built with Next.js 14 using the App Router, with Prisma for database management and PostgreSQL for data storage. The frontend uses Tailwind CSS for styling and Framer Motion for smooth animations.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    category: 'E-Commerce',
    featured: true,
    liveUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/topubiswas/ecommerce-platform',
    gradientFrom: '#7C3AED',
    gradientTo: '#06B6D4',
    status: 'completed',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'AI Chat Application',
    slug: 'ai-chat-application',
    shortDescription: 'Real-time AI-powered chat application with natural language processing and smart responses.',
    fullDescription: `An intelligent chat application that leverages AI to provide natural, context-aware conversations. The app supports multiple conversation threads, message history, and real-time streaming responses.

Key features include:
- **AI Integration**: OpenAI GPT-4 integration with streaming responses
- **Real-time Messaging**: WebSocket-based real-time communication
- **Thread Management**: Organize conversations into threads with context retention
- **Code Highlighting**: Syntax highlighting for code blocks in messages
- **Export Options**: Export conversations in multiple formats

Built with Next.js, Socket.io for real-time features, and OpenAI API for AI capabilities. The UI is designed for optimal readability and ease of use.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'OpenAI', 'Socket.io', 'TypeScript', 'React', 'Node.js'],
    category: 'Web App',
    featured: true,
    liveUrl: 'https://ai-chat.example.com',
    githubUrl: 'https://github.com/topubiswas/ai-chat',
    gradientFrom: '#EC4899',
    gradientTo: '#7C3AED',
    status: 'completed',
    createdAt: '2024-02-10',
  },
  {
    id: '3',
    title: 'Task Management Suite',
    slug: 'task-management-suite',
    shortDescription: 'Collaborative task management tool with kanban boards, timelines, and team collaboration features.',
    fullDescription: `A comprehensive task management solution designed for teams of all sizes. The application combines kanban boards, timeline views, and team collaboration features in one unified platform.

Key features include:
- **Kanban Boards**: Drag-and-drop task management with customizable columns
- **Timeline View**: Gantt-style timeline for project planning
- **Team Collaboration**: Real-time updates, comments, and @mentions
- **Time Tracking**: Built-in time tracking with detailed reports
- **Integrations**: Connect with Slack, GitHub, and other tools

The application uses React with DnD Kit for drag-and-drop, with a Node.js backend and MongoDB for flexible data storage.`,
    thumbnail: '',
    gallery: [],
    tags: ['React', 'Node.js', 'MongoDB', 'DnD Kit', 'TypeScript', 'Tailwind CSS'],
    category: 'SaaS',
    featured: true,
    liveUrl: 'https://tasks.example.com',
    githubUrl: 'https://github.com/topubiswas/task-manager',
    gradientFrom: '#06B6D4',
    gradientTo: '#3B82F6',
    status: 'completed',
    createdAt: '2024-01-28',
  },
  {
    id: '4',
    title: 'Real Estate Marketplace',
    slug: 'real-estate-marketplace',
    shortDescription: 'Property listing platform with advanced search, virtual tours, and agent management.',
    fullDescription: `A modern real estate marketplace connecting buyers, sellers, and agents. The platform features advanced property search, virtual tour integration, and comprehensive agent tools.

Key features include:
- **Advanced Search**: Filter by location, price, amenities, and more
- **Virtual Tours**: 360-degree virtual tour integration
- **Agent Dashboard**: Tools for agents to manage listings and leads
- **Mortgage Calculator**: Built-in financial planning tools
- **Map Integration**: Interactive maps with property markers

Built with Next.js, Mapbox for maps, and Cloudinary for image management. The backend uses Prisma with PostgreSQL.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'Mapbox', 'Prisma', 'PostgreSQL', 'Cloudinary', 'TypeScript'],
    category: 'Web App',
    featured: true,
    liveUrl: 'https://realestate.example.com',
    githubUrl: 'https://github.com/topubiswas/real-estate',
    gradientFrom: '#F59E0B',
    gradientTo: '#EF4444',
    status: 'completed',
    createdAt: '2023-12-05',
  },
  {
    id: '5',
    title: 'Fitness Tracking App',
    slug: 'fitness-tracking-app',
    shortDescription: 'Mobile-first fitness application with workout tracking, nutrition logging, and progress analytics.',
    fullDescription: `A comprehensive fitness tracking application designed for health enthusiasts. Track workouts, nutrition, and monitor progress with detailed analytics and visualizations.

Key features include:
- **Workout Tracking**: Log exercises, sets, reps, and weights
- **Nutrition Logging**: Track calories, macros, and meals
- **Progress Photos**: Document your transformation
- **Analytics Dashboard**: Visualize progress with charts
- **Social Features**: Share workouts and compete with friends

Built as a Progressive Web App with Next.js, using Chart.js for visualizations and IndexedDB for offline support.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'PWA', 'Chart.js', 'TypeScript', 'IndexedDB', 'Tailwind CSS'],
    category: 'Mobile App',
    featured: true,
    liveUrl: 'https://fitness.example.com',
    githubUrl: 'https://github.com/topubiswas/fitness-app',
    gradientFrom: '#10B981',
    gradientTo: '#06B6D4',
    status: 'completed',
    createdAt: '2023-11-20',
  },
  {
    id: '6',
    title: 'Developer Portfolio CMS',
    slug: 'developer-portfolio-cms',
    shortDescription: 'Headless CMS specifically designed for developer portfolios with project showcases and blog.',
    fullDescription: `A specialized content management system designed for developers to showcase their work. Features include project management, blog functionality, and customizable themes.

Key features include:
- **Project Management**: Showcase projects with descriptions, tech stacks, and links
- **Blog Engine**: Write and publish technical articles with MDX support
- **Theme System**: Multiple themes with dark mode support
- **SEO Optimization**: Built-in SEO tools and sitemap generation
- **Analytics**: Track visitors and engagement

Built with Next.js, MDX for content, and a headless architecture allowing multiple frontend implementations.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'MDX', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    category: 'Web App',
    featured: true,
    liveUrl: 'https://portfolio-cms.example.com',
    githubUrl: 'https://github.com/topubiswas/portfolio-cms',
    gradientFrom: '#7C3AED',
    gradientTo: '#EC4899',
    status: 'completed',
    createdAt: '2023-10-15',
  },
  {
    id: '7',
    title: 'REST API Boilerplate',
    slug: 'rest-api-boilerplate',
    shortDescription: 'Production-ready Node.js REST API boilerplate with authentication, validation, and documentation.',
    fullDescription: `A comprehensive REST API boilerplate to jumpstart your backend development. Includes authentication, validation, error handling, and Swagger documentation out of the box.

Key features include:
- **Authentication**: JWT-based auth with refresh tokens
- **Validation**: Request validation with Joi/Zod
- **Error Handling**: Centralized error handling with custom errors
- **Documentation**: Auto-generated Swagger documentation
- **Testing**: Jest setup with integration tests
- **Docker**: Docker and docker-compose configurations

Built with Express.js, TypeScript, and best practices for security and performance.`,
    thumbnail: '',
    gallery: [],
    tags: ['Node.js', 'Express', 'TypeScript', 'JWT', 'Swagger', 'Docker'],
    category: 'API',
    featured: false,
    liveUrl: '',
    githubUrl: 'https://github.com/topubiswas/api-boilerplate',
    gradientFrom: '#6366F1',
    gradientTo: '#8B5CF6',
    status: 'completed',
    createdAt: '2023-09-10',
  },
  {
    id: '8',
    title: 'Social Media Dashboard',
    slug: 'social-media-dashboard',
    shortDescription: 'Unified dashboard for managing multiple social media accounts with scheduling and analytics.',
    fullDescription: `A powerful dashboard for social media managers to handle multiple platforms from one place. Schedule posts, analyze performance, and engage with your audience efficiently.

Key features include:
- **Multi-Platform**: Connect Twitter, LinkedIn, Instagram, and Facebook
- **Post Scheduling**: Schedule posts across platforms
- **Analytics**: Track engagement, reach, and growth
- **Content Calendar**: Visual planning with drag-and-drop
- **Team Collaboration**: Multiple users with role-based access

Built with Next.js, integrating with social media APIs, and using Chart.js for visualizations.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'TypeScript', 'Chart.js', 'Prisma', 'Redis', 'Tailwind CSS'],
    category: 'Web App',
    featured: false,
    liveUrl: 'https://social-dashboard.example.com',
    githubUrl: 'https://github.com/topubiswas/social-dashboard',
    gradientFrom: '#EC4899',
    gradientTo: '#F59E0B',
    status: 'completed',
    createdAt: '2023-08-22',
  },
  {
    id: '9',
    title: 'Inventory Management System',
    slug: 'inventory-management',
    shortDescription: 'Enterprise-grade inventory management with barcode scanning, alerts, and reporting.',
    fullDescription: `A complete inventory management solution for businesses of all sizes. Track stock levels, manage suppliers, and generate detailed reports for informed decision-making.

Key features include:
- **Stock Tracking**: Real-time inventory levels across locations
- **Barcode Scanning**: Mobile app for quick scanning
- **Alerts**: Low stock alerts and reorder notifications
- **Reporting**: Comprehensive reports and analytics
- **Multi-location**: Manage inventory across warehouses

Built with Next.js for the dashboard and React Native for mobile scanning. Uses PostgreSQL with Prisma ORM.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'React Native', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    category: 'Web App',
    featured: false,
    liveUrl: 'https://inventory.example.com',
    githubUrl: 'https://github.com/topubiswas/inventory',
    gradientFrom: '#14B8A6',
    gradientTo: '#10B981',
    status: 'completed',
    createdAt: '2023-07-18',
  },
  {
    id: '10',
    title: 'Booking System API',
    slug: 'booking-system-api',
    shortDescription: 'Flexible booking and scheduling API with timezone support and calendar integrations.',
    fullDescription: `A versatile booking API designed for service-based businesses. Handle appointments, manage availability, and integrate with popular calendar services.

Key features include:
- **Flexible Scheduling**: Define availability with rules
- **Timezone Support**: Handle bookings across timezones
- **Calendar Sync**: Google and Outlook calendar integration
- **Notifications**: Email and SMS reminders
- **Multi-service**: Support for multiple service types

Built with Node.js, Express, and MongoDB with comprehensive API documentation.`,
    thumbnail: '',
    gallery: [],
    tags: ['Node.js', 'Express', 'MongoDB', 'TypeScript', 'Google API', 'Redis'],
    category: 'API',
    featured: false,
    liveUrl: '',
    githubUrl: 'https://github.com/topubiswas/booking-api',
    gradientFrom: '#3B82F6',
    gradientTo: '#6366F1',
    status: 'completed',
    createdAt: '2023-06-30',
  },
  {
    id: '11',
    title: 'Cryptocurrency Tracker',
    slug: 'crypto-tracker',
    shortDescription: 'Real-time cryptocurrency price tracking with portfolio management and alerts.',
    fullDescription: `A comprehensive cryptocurrency tracking application with real-time prices, portfolio management, and customizable alerts. Stay on top of the crypto market with detailed analytics.

Key features include:
- **Real-time Prices**: Live prices from multiple exchanges
- **Portfolio Tracking**: Track your holdings and performance
- **Price Alerts**: Custom alerts for price movements
- **Market Analysis**: Technical indicators and charts
- **News Feed**: Aggregated crypto news

Built with React, using CoinGecko API for data, and Chart.js for visualizations.`,
    thumbnail: '',
    gallery: [],
    tags: ['React', 'TypeScript', 'CoinGecko API', 'Chart.js', 'Tailwind CSS', 'WebSocket'],
    category: 'Web App',
    featured: false,
    liveUrl: 'https://crypto.example.com',
    githubUrl: 'https://github.com/topubiswas/crypto-tracker',
    gradientFrom: '#F59E0B',
    gradientTo: '#EAB308',
    status: 'completed',
    createdAt: '2023-05-12',
  },
  {
    id: '12',
    title: 'Learning Management System',
    slug: 'learning-management-system',
    shortDescription: 'Complete LMS with course creation, student tracking, and certification.',
    fullDescription: `A full-featured learning management system for creating and selling online courses. Includes video hosting, progress tracking, quizzes, and certificate generation.

Key features include:
- **Course Builder**: Create courses with video, text, and quizzes
- **Student Dashboard**: Track progress and achievements
- **Certificates**: Auto-generated certificates on completion
- **Payments**: Stripe integration for course sales
- **Analytics**: Detailed course and student analytics

Built with Next.js, using Mux for video streaming, and Prisma with PostgreSQL.`,
    thumbnail: '',
    gallery: [],
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Mux', 'Stripe', 'TypeScript'],
    category: 'SaaS',
    featured: false,
    liveUrl: 'https://lms.example.com',
    githubUrl: 'https://github.com/topubiswas/lms',
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
    status: 'in-progress',
    createdAt: '2024-03-01',
  },
];

// Blog tags
export const blogTags = [
  'All',
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'CSS',
  'DevOps',
  'Career',
];

// Blog posts data
export const blogPosts: PostType[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15: A Complete Guide',
    slug: 'getting-started-nextjs-15',
    excerpt: 'Learn how to build modern web applications with Next.js 15, featuring the new App Router, Server Components, and more.',
    content: `# Getting Started with Next.js 15

Next.js 15 introduces groundbreaking features that revolutionize how we build React applications. In this comprehensive guide, we'll explore the new App Router, Server Components, and other exciting features.

## What's New in Next.js 15

### Server Components by Default

One of the most significant changes in Next.js 15 is that all components are Server Components by default. This means:

- Better performance with server-side rendering
- Reduced bundle sizes
- Direct database queries in components
- Improved SEO

\`\`\`typescript
// This is a Server Component by default
async function BlogPost({ slug }: { slug: string }) {
  const post = await db.post.findUnique({ where: { slug } });
  return <article>{post.content}</article>;
}
\`\`\`

### The New App Router

The App Router provides a more intuitive way to structure your application:

- File-based routing with special files
- Nested layouts
- Loading states
- Error handling

### Getting Started

To create a new Next.js 15 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 15 represents a major step forward in React development. The combination of Server Components, the App Router, and improved developer experience makes it the best choice for building modern web applications.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['Next.js', 'React', 'TypeScript'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '8 min read',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for React Developers',
    slug: 'typescript-best-practices-react',
    excerpt: 'Master TypeScript patterns and best practices specifically for React development. Learn how to write type-safe components.',
    content: `# TypeScript Best Practices for React Developers

TypeScript has become essential for building robust React applications. In this article, we'll explore best practices and patterns that will help you write better, type-safe code.

## Type Your Props

Always define interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

function Button({ label, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
\`\`\`

## Use Generics for Reusable Components

Generics allow you to create flexible, reusable components:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
\`\`\`

## Conclusion

TypeScript adds a layer of safety to your React applications that catches bugs before they reach production. By following these best practices, you'll write more maintainable and robust code.`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    tags: ['TypeScript', 'React'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '6 min read',
    createdAt: '2024-03-10',
  },
  {
    id: '3',
    title: 'Building Responsive Layouts with Tailwind CSS',
    slug: 'responsive-layouts-tailwind',
    excerpt: 'Create beautiful, responsive layouts using Tailwind CSS utility classes. Learn responsive design patterns and techniques.',
    content: `# Building Responsive Layouts with Tailwind CSS

Tailwind CSS makes responsive design intuitive and efficient. Let's explore how to build layouts that look great on every device.

## Mobile-First Approach

Tailwind uses a mobile-first approach. Base styles target mobile, and you add responsive modifiers for larger screens:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-blue-500">Card 1</div>
  <div class="p-4 bg-blue-500">Card 2</div>
  <div class="p-4 bg-blue-500">Card 3</div>
</div>
\`\`\`

## Responsive Breakpoints

Tailwind includes these default breakpoints:

- \`sm\`: 640px
- \`md\`: 768px
- \`lg\`: 1024px
- \`xl\`: 1280px
- \`2xl\`: 1536px

## Flexbox Layouts

\`\`\`html
<div class="flex flex-col md:flex-row gap-4">
  <aside class="w-full md:w-64">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
\`\`\`

## Conclusion

Tailwind CSS provides all the tools you need to create responsive, beautiful layouts. The key is thinking mobile-first and using responsive modifiers strategically.`,
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    tags: ['CSS', 'Next.js'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '5 min read',
    createdAt: '2024-03-05',
  },
  {
    id: '4',
    title: 'Node.js Performance Optimization Tips',
    slug: 'nodejs-performance-optimization',
    excerpt: 'Optimize your Node.js applications for better performance. Learn caching, clustering, and profiling techniques.',
    content: `# Node.js Performance Optimization Tips

Building fast Node.js applications requires understanding the runtime and applying optimization techniques. Here's what you need to know.

## Use Clustering

Take advantage of multi-core systems with clustering:

\`\`\`javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Your server code
  app.listen(3000);
}
\`\`\`

## Implement Caching

Use Redis for caching frequently accessed data:

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedData(key) {
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchDataFromDB();
  await client.set(key, JSON.stringify(data), 'EX', 3600);
  return data;
}
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Profile your application, identify bottlenecks, and apply targeted optimizations for the best results.`,
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    tags: ['Node.js', 'DevOps'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '7 min read',
    createdAt: '2024-02-28',
  },
  {
    id: '5',
    title: 'React Hooks Deep Dive: useEffect and useCallback',
    slug: 'react-hooks-deep-dive',
    excerpt: 'Understand React hooks deeply. Learn when and how to use useEffect, useCallback, and useMemo effectively.',
    content: `# React Hooks Deep Dive: useEffect and useCallback

React hooks changed how we write React components. Let's dive deep into useEffect and useCallback.

## Understanding useEffect

useEffect runs side effects in function components:

\`\`\`typescript
useEffect(() => {
  // Effect code here
  return () => {
    // Cleanup code
  };
}, [dependencies]);
\`\`\`

### Common Pitfalls

1. **Missing dependencies**: Always include all values from the component scope
2. **Stale closures**: Use the functional update form for state
3. **Unnecessary effects**: Don't use effects for transformations

## useCallback for Function Memoization

\`\`\`typescript
const memoizedCallback = useCallback(
  (id: string) => {
    doSomething(id);
  },
  [dependency],
);
\`\`\`

## Conclusion

Mastering hooks is essential for modern React development. Understanding when and how to use them will make your components more efficient and your code cleaner.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    tags: ['React', 'TypeScript'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '10 min read',
    createdAt: '2024-02-20',
  },
  {
    id: '6',
    title: 'Docker for Node.js Developers',
    slug: 'docker-nodejs-developers',
    excerpt: 'Learn Docker basics for Node.js applications. Create efficient containers and docker-compose setups.',
    content: `# Docker for Node.js Developers

Docker simplifies deployment and ensures consistency across environments. Here's how to get started.

## Dockerfile Basics

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]
\`\`\`

## Multi-stage Builds

Optimize your images with multi-stage builds:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
\`\`\`

## Conclusion

Docker provides reproducible, portable environments for your Node.js applications. Start with the basics and gradually optimize your containers for production.`,
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80',
    tags: ['Node.js', 'DevOps'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '9 min read',
    createdAt: '2024-02-15',
  },
  {
    id: '7',
    title: 'API Design Best Practices',
    slug: 'api-design-best-practices',
    excerpt: 'Design RESTful APIs that developers love. Learn about versioning, error handling, and documentation.',
    content: `# API Design Best Practices

A well-designed API is a joy to work with. Here are principles to follow.

## RESTful Resource Naming

Use nouns, not verbs:

\`\`\`
Good: GET /users/123/orders
Bad: GET /getUserOrders/123
\`\`\`

## Versioning

Always version your APIs:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

## Error Handling

Return consistent error responses:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      {
        "field": "email",
        "message": "This field is required"
      }
    ]
  }
}
\`\`\`

## Conclusion

Good API design takes effort upfront but saves countless hours for developers using your API. Follow these practices for APIs that are intuitive and maintainable.`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Node.js', 'TypeScript'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '6 min read',
    createdAt: '2024-02-10',
  },
  {
    id: '8',
    title: 'State Management in React: A Practical Guide',
    slug: 'state-management-react',
    excerpt: 'Navigate the state management landscape in React. Compare Redux, Zustand, and React Context.',
    content: `# State Management in React: A Practical Guide

Choosing the right state management solution is crucial for React applications. Let's compare the options.

## React Context

Best for simple state that doesn't change often:

\`\`\`typescript
const ThemeContext = createContext<Theme>('light');

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={theme}>
      <AppContent />
    </ThemeContext.Provider>
  );
}
\`\`\`

## Zustand

Simple, scalable state management:

\`\`\`typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
\`\`\`

## Conclusion

Choose your state management based on your application's complexity. Start simple and scale up as needed.`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['React', 'TypeScript'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '8 min read',
    createdAt: '2024-02-05',
  },
  {
    id: '9',
    title: 'Building a Career as a Full Stack Developer',
    slug: 'full-stack-career-guide',
    excerpt: 'Navigate your journey as a full stack developer. Learn what skills to focus on and how to grow professionally.',
    content: `# Building a Career as a Full Stack Developer

Being a full stack developer is both challenging and rewarding. Here's how to build a successful career.

## Essential Skills

### Frontend
- HTML, CSS, JavaScript fundamentals
- React, Vue, or Angular
- CSS frameworks (Tailwind, Bootstrap)
- State management

### Backend
- Node.js, Python, or Go
- REST and GraphQL APIs
- Database design (SQL, NoSQL)
- Authentication & security

### DevOps
- Git and version control
- Docker and containers
- CI/CD pipelines
- Cloud platforms (AWS, Vercel)

## Continuous Learning

The tech industry evolves rapidly. Stay current by:

1. Following tech blogs and newsletters
2. Contributing to open source
3. Building personal projects
4. Attending conferences and meetups

## Conclusion

A successful full stack career requires continuous learning and adaptation. Focus on fundamentals, stay curious, and build projects that challenge you.`,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tags: ['Career'],
    author: {
      name: 'Topu Biswas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      bio: 'Full Stack Web Developer passionate about creating beautiful and functional web applications.',
    },
    readTime: '7 min read',
    createdAt: '2024-01-28',
  },
];

// Helper functions
export function getProjectBySlug(slug: string): ProjectType | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPostBySlug(slug: string): PostType | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, category: string): ProjectType[] {
  return projects
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);
}

export function getRelatedPosts(currentSlug: string, tags: string[]): PostType[] {
  return blogPosts
    .filter((p) => {
      if (p.slug === currentSlug) return false;
      return p.tags.some((tag) => tags.includes(tag));
    })
    .slice(0, 3);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

// Media data
export interface MediaType {
  id: string;
  title: string;
  type: 'youtube' | 'vimeo' | 'facebook' | 'instagram' | 'tiktok' | 'link';
  url: string;
  thumbnail: string;
  description: string;
  duration: string;
  views: string;
  createdAt: string;
}

export const mediaItems: MediaType[] = [
  {
    id: '1',
    title: 'Building a Full Stack App with Next.js 15',
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: '',
    description: 'Complete tutorial on building a production-ready app with Next.js 15',
    duration: '45:30',
    views: '12K',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    title: 'TypeScript Advanced Patterns',
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example2',
    thumbnail: '',
    description: 'Deep dive into advanced TypeScript patterns and best practices',
    duration: '32:15',
    views: '8.5K',
    createdAt: '2024-03-05',
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example3',
    thumbnail: '',
    description: 'Learn how to optimize your React applications for better performance',
    duration: '28:45',
    views: '15K',
    createdAt: '2024-02-28',
  },
  {
    id: '4',
    title: 'Node.js API Development Guide',
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example4',
    thumbnail: '',
    description: 'Build robust REST APIs with Node.js and Express',
    duration: '55:00',
    views: '6.2K',
    createdAt: '2024-02-20',
  },
  {
    id: '5',
    title: 'Tailwind CSS Masterclass',
    type: 'vimeo',
    url: 'https://vimeo.com/example5',
    thumbnail: '',
    description: 'Master Tailwind CSS and build beautiful responsive designs',
    duration: '40:20',
    views: '4.8K',
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    title: 'Database Design Fundamentals',
    type: 'youtube',
    url: 'https://youtube.com/watch?v=example6',
    thumbnail: '',
    description: 'Learn how to design efficient database schemas',
    duration: '38:10',
    views: '9.1K',
    createdAt: '2024-02-10',
  },
];

// File data
export interface FileType {
  id: string;
  title: string;
  fileUrl: string;
  type: string;
  category: string;
  description: string;
  size: string;
  createdAt: string;
}

export const fileItems: FileType[] = [
  {
    id: '1',
    title: 'Resume - Topu Biswas',
    fileUrl: '/files/resume.pdf',
    type: 'pdf',
    category: 'Resume',
    description: 'My latest resume with full work history and skills',
    size: '245 KB',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Portfolio Presentation',
    fileUrl: '/files/portfolio.pptx',
    type: 'pptx',
    category: 'Documents',
    description: 'A presentation showcasing my best projects',
    size: '3.2 MB',
    createdAt: '2024-03-01',
  },
  {
    id: '3',
    title: 'Project Case Study Template',
    fileUrl: '/files/case-study.docx',
    type: 'docx',
    category: 'Resources',
    description: 'Template for documenting project case studies',
    size: '156 KB',
    createdAt: '2024-02-20',
  },
  {
    id: '4',
    title: 'Next.js Starter Template',
    fileUrl: '/files/nextjs-starter.zip',
    type: 'zip',
    category: 'Resources',
    description: 'A production-ready Next.js starter with TypeScript',
    size: '1.8 MB',
    createdAt: '2024-02-15',
  },
  {
    id: '5',
    title: 'API Documentation Template',
    fileUrl: '/files/api-docs.pdf',
    type: 'pdf',
    category: 'Documents',
    description: 'Template for writing clean API documentation',
    size: '320 KB',
    createdAt: '2024-02-10',
  },
  {
    id: '6',
    title: 'Design System Guidelines',
    fileUrl: '/files/design-system.pdf',
    type: 'pdf',
    category: 'Documents',
    description: 'Guidelines for building consistent design systems',
    size: '2.1 MB',
    createdAt: '2024-02-05',
  },
];

// Social links data
export interface SocialLinkType {
  id: string;
  platform: string;
  url: string;
  username: string;
}

export const socialLinks: SocialLinkType[] = [
  { id: '1', platform: 'github', url: 'https://github.com/topubiswas', username: '@topubiswas' },
  { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/topubiswas', username: 'Topu Biswas' },
  { id: '3', platform: 'twitter', url: 'https://twitter.com/topubiswas', username: '@topubiswas' },
  { id: '4', platform: 'facebook', url: 'https://facebook.com/topubiswas', username: 'Topu Biswas' },
  { id: '5', platform: 'instagram', url: 'https://instagram.com/topubiswas', username: '@topubiswas' },
  { id: '6', platform: 'youtube', url: 'https://youtube.com/@topubiswas', username: '@topubiswas' },
];
