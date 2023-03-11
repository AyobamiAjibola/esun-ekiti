import { Box, Button, Typography } from "@mui/material";
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface InfinitScrollProps {
  fetchNextPage: any
  hasNextPage: any
  isFetchingNextPage: any
  isFetching: any
  status: any
}

export default function InfinitScrollBtn ({ fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, status }: InfinitScrollProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage() //eslint-disable-line
    }
  }, [inView])
  return (
    <>
        <Button
            ref={ ref }
            onClick={ () => fetchNextPage() } //eslint-disable-line
            disabled={ !hasNextPage || isFetchingNextPage } //eslint-disable-line
            sx={{
              fontWeight: 600
            }}
        >
            { isFetchingNextPage //eslint-disable-line
              ? 'Loading...'
              : hasNextPage //eslint-disable-line
                ? 'Load Newer'
                : status === 'error' || status === 'loading'
                  ? ''
                  : 'Nothing more to load'
            }
        </Button>
        <Box>
            { isFetching && !isFetchingNextPage //eslint-disable-line
              ? status === 'loading'
                ? ''
                : <Typography
                    sx={{
                      color: '#521414',
                      fontWeight: 600
                    }}
                  >Updating...</Typography>
              : null
            }
        </Box>
    </>
  )
}
