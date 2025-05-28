import mongoose, { Schema, Document } from 'mongoose'

export interface IListing extends Document {
  title: string
  description: string
  price: number
  location: string
  categoryId: mongoose.Types.ObjectId
  attributes: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const ListingSchema = new Schema<IListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  attributes: { type: Schema.Types.Mixed, default: {} }
}, {
  timestamps: true
})

// Create text index for search
ListingSchema.index({ title: 'text', description: 'text' })

// Create compound indexes for common filters
ListingSchema.index({ categoryId: 1, price: 1 })
ListingSchema.index({ categoryId: 1, location: 1 })

export default mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema)
