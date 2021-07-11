import React from 'react';

import "./Description.css"

function Descripion({ product }) {
    console.log(product);
    return (
        <div className="des-product">
            {
                product.category === 'laptop' &&
                <div className="des-laptop">
                    <p>Whether for work or play, <strong>{product.title}</strong> is the entry-level laptop that delivers powerful performance and immersive visuals. Inside, it’s powered by up to an <strong>{product.content.cpu}</strong> processor with <strong>{product.content.ram}</strong> RAM, and <strong>{product.content.vga}</strong> discrete graphics. A dual-storage design with up to a <strong>{product.content.harddisk}</strong> and a 1 TB HDD gives you the perfect combination of large storage capacity and fast data read / write speeds. There’s also Intel® Optane™ memory support1 to help speed things up even more.</p>
                    <img src={product.images.url[0]} alt={product.title} />
                    <h3 style={{ textAlign: "center" }}>Fast and efficient</h3>
                    <p>With up to an <strong>{product.content.cpu}</strong> processor and <strong>{product.content.vga}</strong> discrete graphics. This helps you get things done swiftly and efficiently.</p>
                    <img src={product.images.url[1]} alt={product.title} />
                    <div className="cpu">
                        <p>{product.content.cpu}</p>
                    </div>
                    <div className="hdh-ram">
                        <div className="hdh">
                            <p>{product.content.operatingSystem}</p>
                        </div>
                        <div className="ram">
                            <p>{product.content.ram}</p>
                        </div>
                    </div>
                    <h3>Store more, do more</h3>
                    <p>This product has a storage design to give you the benefits of superfast data performance and a large storage capacity. Install apps on the <strong>{product.content.harddisk}</strong> for quicker response and loading times, and use it to store large files such as movies, music libraries, and photo albums. </p>
                    <img src={product.images.url[2]} alt={product.title} />
                    <h3>Empower your dynamic lifestyle!</h3>
                    <p>With an overall weight of just <strong>{product.content.weight}</strong>, the extremely portable ASUS X415 is the lightweight laptop that keeps up with your fast-paced lifestyle. It looks good, too, with its Transparent Silver or Slate Grey finish.</p>
                    <img src={product.images.url[3]} alt={product.title} />
                    <h3>Get the very best from your laptop</h3>
                    <p><strong>{product.brand}</strong> is the easy way to access handy <strong>{product.content.operatingSystem}</strong> apps that help you get more out of your laptop or desktop Laptop. Multitask using your iOS or Android phone with your Laptop, optimize your Laptop’s performance or contact after-sales service and support. There’s also a huge range of popular app downloads and exclusive offers just for you!</p>
                </div>
            }
        </div>
    );
}

export default Descripion;