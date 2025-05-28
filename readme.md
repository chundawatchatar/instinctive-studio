# B2B Marketplace Search - Next.js Frontend

A modern, full-stack B2B marketplace search application built with Next.js, TypeScript, MongoDB, and Tailwind CSS. Features intelligent search, dynamic filtering, and category-specific facets.

## Features

- **Natural Language Search**: Full-text search across product titles and descriptions
- **Dynamic Filtering**: Category-specific filters that adapt based on search context
- **Real-time Facets**: Live filter counts that update based on current search results
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Clean, intuitive interface with loading states and error handling

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Database**: MongoDB with Mongoose ODM
- **Search**: MongoDB text search with aggregation pipelines
- **Deployment**: Docker support with docker-compose

## Prerequisites

- Node.js 18+ 
- MongoDB (via Docker or local installation)
- npm or yarn

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd b2b-marketplace-frontend
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27019/b2b-marketplace
NODE_ENV=development
```

### 3. Start MongoDB (with Docker)

```bash
# Start MongoDB and Qdrant services
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 4. Seed the Database

```bash
npm run seed
```

This will create:
- 2 categories (Televisions, Running Shoes)
- 30+ sample listings with realistic attributes
- Proper indexes for search performance

### 5. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and navigate to `/search` to start exploring!

## API Documentation

### Search API

**Endpoint**: `GET /api/search`

**Parameters**:
- `q` (string): Search query for full-text search
- `category` (string): Category slug to filter results
- `filters` (JSON string): URL-encoded JSON object for attribute filtering
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Results per page (default: 20)

**Example**:
```
GET /api/search?q=samsung&category=televisions&filters=%7B%22screenSize%22%3A%5B%2255%22%5D%7D
```

**Response**:
```json
{
  "results": [...],
  "facets": [...],
  "total": 150,
  "page": 1,
  "limit": 20,
  "hasMore": true
}
```

### Categories API

**Endpoint**: `GET /api/categories`

Returns all available categories with their slugs.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── search/            # Search page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── SearchBar.tsx      # Search input component
│   ├── FilterPanel.tsx    # Dynamic filters sidebar
│   ├── SearchResults.tsx  # Results display
│   └── CategorySelector.tsx
├── lib/                   # Utilities and configurations
│   ├── mongodb.ts         # Database connection
│   └── models/            # Mongoose models
├── types/                 # TypeScript type definitions
├── scripts/               # Database seeding scripts
└── docker-compose.yml     # Docker services
```

## Sample Searches

Try these searches to see the system in action:

1. **Text Search**: "samsung 4k tv"
2. **Category + Filters**: Select "Televisions" → Filter by "55 inch" + "QLED"
3. **Shoe Search**: "nike running shoes" → Filter by size "9" + color "Black"
4. **Price Range**: Search within specific categories and observe price distributions

## Database Schema

### Categories Collection
```javascript
{
  name: "Televisions",
  slug: "televisions", 
  attributeSchema: {
    screenSize: { type: "string", label: "Screen Size", options: [...] },
    technology: { type: "string", label: "Technology", options: [...] }
  }
}
```

### Listings Collection
```javascript
{
  title: "55 Samsung QLED TV",
  description: "...",
  price: 45000,
  location: "Mumbai",
  categoryId: ObjectId,
  attributes: { screenSize: "55\"", technology: "QLED" }
}
```

## Development Notes

- **Text Search**: Uses MongoDB's `$text` operator with text indexes
- **Facet Generation**: Dynamic aggregation pipelines based on category schemas
- **State Management**: URL-driven state for shareable search results
- **Performance**: Optimized with proper indexing and lean queries
- **Error Handling**: Comprehensive error boundaries and loading states

## Production Considerations

For production deployment:

1. **Environment Variables**: Set proper MongoDB connection strings
2. **Indexing**: Ensure proper database indexes are created
3. **Caching**: Consider Redis for facet caching
4. **Search Engine**: Upgrade to Elasticsearch for advanced search features
5. **CDN**: Use CDN for static assets
6. **Monitoring**: Add application monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.