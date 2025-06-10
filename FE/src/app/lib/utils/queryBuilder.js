export function buildGetProductQuery({
  search = '',
  sort = { field: 'id', order: 'asc' },
  pagination = { page: 1, limit: 10 },
  filters = {} 
} = {}) {
  const params = new URLSearchParams();

  if (search) params.append('search', search);

  if (sort.field) params.append('sortBy', sort.field);
  if (sort.order) params.append('sortOrder', sort.order);

  if (pagination.page) params.append('page', pagination.page);
  if (pagination.limit) params.append('limit', pagination.limit);

  for (const [key, value] of Object.entries(filters)) {
      params.append(key, value);
  }

  return params.toString();
}
