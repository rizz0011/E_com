
 export const commonFields = [
    { label: "Title", name: "title" , renderType:'textField'},
    { label: "Description", name: "description", renderType:'textArea' },
    { label: "Actual Price", name: "price", renderType:'textField' , inType:'number' },
    { label: "Compare Price", name: "comparePrice", renderType:'textField', inType:'number' },
    { label: "Quantity", name: "quantity", renderType:'textField', inType:'number' },
    { label: "Weight", name: "weight",renderType:'textField', inType:'number' },
    { label: "Category", name: "category" ,renderType:'dropdownField', data: [{id:'t-shirt',  name:'T-Shirt'}, {id:'shirt',  name:'Shirt'}, {id:'jeans',  name:'Jeans'}]},
    { label: "Status", name: "status", renderType:'dropdownField',data: [{id:'active',  name:'Active'}, {id:'draft',  name:'Draft'}] },
    { label: "Collection", name: "collection" ,renderType:'dropdownField', data : [{id:'pattern',  name:'Pattern'}, {id:'oversized',  name:'OverSized'}, {id:'regular',  name:'Regular'}]},  
    { label: "Tags", name: "tags",renderType:'multiValField' },
  ];



  export const tableColumns = [
    { label: "Product", name: "ImgUrls" },
    { label: "Title", name: "title" },
    { label: "Price", name: "price" },
    { label: "Quantity", name: "quantity" },
    { label: "Category", name: "category" },
    { label: "Status", name: "status" },
    { label: "Collection", name: "collection"}, 
    { label: "Created At", name: "created_at"},  
    { label: "Edit", name: "edit"},  
  ]