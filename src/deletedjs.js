// From product

{product.inCart?(<p className="text-capitalize mb-0" disabled>In cart</p>)
:(<React.Fragment>
     <div className="size-button"><span>Small</span></div>
     <div className="size-button"><span>Medium</span></div>
     <div className="size-button"><span>Large</span></div>
</React.Fragment>)}