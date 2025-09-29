import { Slug } from './slug'

it('should be ablet to create a slug from a string', () => {
  const slug = Slug.createFromText('An example title')

  expect(slug.value).toBe('an-example-title')
})
