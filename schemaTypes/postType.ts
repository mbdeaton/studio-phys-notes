import {defineArrayMember, defineField, defineType} from 'sanity'

type AnchoredFigure = {anchor?: string}

const hasDuplicateAnchor = (anchor: string, figures: AnchoredFigure[]) =>
  figures.filter((figure) => figure.anchor === anchor).length > 1

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string', title: 'Alt text'}],
    }),
    defineField({
      name: 'caption',
      type: 'text',
      title: 'Caption',
    }),
    defineField({
      name: 'note',
      type: 'array',
      title: 'Note',
      description:
        'Link a mention to a figure using #<anchor>, for example #figure-1. The anchor must match a figure on this same post.',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'figures',
      type: 'array',
      title: 'Figures',
      description:
        'Add each figure once and use the same anchor in the note via #<anchor> so it appears beside the first matching note reference.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'figure',
          title: 'Figure',
          fields: [
            defineField({
              name: 'anchor',
              type: 'string',
              title: 'Anchor',
              description: 'Example: figure-1',
              validation: (rule) =>
                rule
                  .required()
                  .min(3)
                  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
                  .custom((value, context) => {
                    if (!value) {
                      return true
                    }

                    const figures = Array.isArray(context.document?.figures)
                      ? context.document.figures
                      : []

                    return hasDuplicateAnchor(value, figures)
                      ? 'Each figure anchor must be unique within the post.'
                      : true
                  }),
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt text',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'caption',
              type: 'text',
              title: 'Caption',
            }),
          ],
          preview: {
            select: {
              title: 'anchor',
              media: 'image',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'originalLetterPages',
      type: 'array',
      title: 'Original letter pages',
      description:
        'Keep the page order as-written; use useful alt text or a brief page description for each scan.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text or page description',
              validation: (rule) => rule.required().min(10),
            }),
          ],
        },
      ],
    }),
  ],
})
