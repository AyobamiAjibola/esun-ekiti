import { Box } from '@mui/material';

export default function Carousel () {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active"
            style={{
              borderRight: "2px solid white",
              borderLeft: "2px solid white",
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { lg: '550px', sm: '400px', xs: '300px' }
              }}
            >
              <img src="assets/esun.JPG" className="d-block w-100" alt="esun"
                style={{
                  width: "100%",
                  height: '100%',
                  objectFit: "fill"
                }}
              />
            </Box>
          </div>
          <div className="carousel-item"
              style={{
                borderRight: "2px solid white",
                borderLeft: "2px solid white",
                overflow: 'hidden'
              }}
          >
            <Box
              sx={{
                width: '100%',
                height: { lg: '550px', sm: '400px', xs: '300px' }
              }}
            >
              <img src="assets/esun2.JPG" className="d-block w-100" alt="esun2"
                style={{
                  width: "100%",
                  height: '100%',
                  objectFit: "fill"
                }}
              />
            </Box>
          </div>
          <div className="carousel-item"
            style={{
              borderRight: "2px solid white",
              borderLeft: "2px solid white",
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { lg: '550px', sm: '400px', xs: '300px' }
              }}
            >
              <img src="assets/esun3.jpg" className="d-block w-100" alt="esun3"
                style={{
                  width: "100%",
                  height: '100%',
                  objectFit: "fill"
                }}
              />
            </Box>
          </div>
          <div className="carousel-item"
            style={{
              borderRight: "2px solid white",
              borderLeft: "2px solid white",
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: { lg: '550px', sm: '400px', xs: '300px' }
              }}
            >
              <img src="assets/esun4.jpg" className="d-block w-100" alt="esun3"
                style={{
                  width: "100%",
                  height: '100%',
                  objectFit: "fill"
                }}
              />
            </Box>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
}
