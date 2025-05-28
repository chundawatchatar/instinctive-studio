import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  attributeSchema: Record<string, {
    type: 'string' | 'number' | 'boolean' | 'array'
    label: string
    options?: string[]
    required?: boolean
  }>
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  attributeSchema: { type: Schema.Types.Mixed, required: true }
}, {
  timestamps: true
})

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
