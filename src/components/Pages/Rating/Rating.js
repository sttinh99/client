import React from 'react';
import './Rating.css'

function Rating({ product }) {
    const rate = 100 - ((product.rating / (product.totalReview || 1)) * 20)
    const stylecss = {
        clipPath: product.totalReview === 0 ? 'inset(0 100% 0 0)' : `inset(0 ${rate}% 0 0)`
    }
    return (
        <div className="rating">
            <div className="star">
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <div className='star-1' style={stylecss}>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
        </div>
    );
}

export default Rating;