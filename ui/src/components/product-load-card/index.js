import React from "react";
import SpinnerComp from "../spinner";

const ProductLoadPlaceHolder = () => {
    return (
        <div className="card product-card" aria-hidden="true">
            {/* <img src="..." className="card-img-top product-card-img bg-gray-400" alt="..."/> */}
            <div className="card-img-top product-card-img bg-gray-300" >
                <SpinnerComp style={{height: '100%'}}/>
            </div>
                <div className="card-body pt-1">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <div className="d-flex gap-2">
                        <a href="#" tabIndex="-1" className="btn btn-dark disabled placeholder col-6"></a>
                        <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                    </div>
                </div>
        </div>
    )
}

export default ProductLoadPlaceHolder