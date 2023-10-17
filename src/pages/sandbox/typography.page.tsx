import Typography from '@/components/typography/Typography';

export default function TypographyPage() {
  return (
    <div className='p-6 space-y-4 bg-base-surface text-base-primary'>
      <Typography as='h1' variant='h1' font='montserrat' className='font-bold'>
        Typography
      </Typography>

      <div className='space-y-0'>
        <Typography as='h1' variant='h1'>
          Open Sans Heading 1
        </Typography>
        <Typography as='h2' variant='h2'>
          Open Sans Heading 2
        </Typography>
        <Typography as='h3' variant='h3'>
          Open Sans Heading 3
        </Typography>
        <Typography as='h4' variant='h4'>
          Open Sans Heading 4
        </Typography>
        <Typography as='h5' variant='h5'>
          Open Sans Heading 5
        </Typography>
        <Typography as='h6' variant='h6'>
          Open Sans Heading 6
        </Typography>
        <Typography as='p' variant='p'>
          Open Sans Paragraph
        </Typography>
        <Typography as='p' variant='c'>
          Open Sans Caption
        </Typography>
      </div>

      <div className='space-y-0'>
        <Typography as='h1' variant='h1' font='montserrat'>
          Montserrat Heading 1
        </Typography>
        <Typography as='h2' variant='h2' font='montserrat'>
          Montserrat Heading 2
        </Typography>
        <Typography as='h3' variant='h3' font='montserrat'>
          Montserrat Heading 3
        </Typography>
        <Typography as='h4' variant='h4' font='montserrat'>
          Montserrat Heading 4
        </Typography>
        <Typography as='h5' variant='h5' font='montserrat'>
          Montserrat Heading 5
        </Typography>
        <Typography as='h6' variant='h6' font='montserrat'>
          Montserrat Heading 6
        </Typography>
        <Typography as='p' variant='p' font='montserrat'>
          Montserrat Paragraph
        </Typography>
        <Typography as='p' variant='c' font='montserrat'>
          Montserrat Caption
        </Typography>
      </div>
    </div>
  );
}
