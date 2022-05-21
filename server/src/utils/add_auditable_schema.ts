import { SchemaDefinition } from 'mongoose';

export const addAuditableSchema = (definition: SchemaDefinition): SchemaDefinition => {
  return {
    ...definition,
    createdBy: String,
    createdAt: Number,
    updatedBy: String,
    updatedAt: Number,
  };
};