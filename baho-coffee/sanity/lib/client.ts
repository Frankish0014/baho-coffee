import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, isSanityConfigured } from '../env'

// Only create client if Sanity is configured
export const client = isSanityConfigured() 
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  : null
