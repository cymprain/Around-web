import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GridGallery from 'react-grid-gallery';

class Gallery extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                caption: PropTypes.string,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired
            })
        ).isRequired
    }
    render() {
        const { images } = this.props;
        console.log(images);

        const imageArr = images.map(image => {
            return {
                ...image,
                customOverlay: (
                    <div className="gallery-thumbnail">
                        <div>{`${image.user}: ${image.caption}`}</div>
                    </div>
                )
            }
        })
        return (
            <div>
                <GridGallery
                    enableImageSelection={false}
                    images={imageArr}
                    backdropClosesModal/>
            </div>
        );
    }
}

export default Gallery;