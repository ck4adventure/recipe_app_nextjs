import chocolate from '../../../recipe_store/ingrs/chocolates';

const createIngr = `
	INSERT INTO ingrs (
    brand, 
    packaged_name, 
    label_name, 
    ingredients, 
    allergens
) VALUES (
    'BrandName', 
    'PackagedName', 
    'LabelName', 
    ARRAY['ingredient1', 'ingredient2'], 
    ARRAY['milk', 'eggs']
);
`
export const loadChocolates = async (client) => {

}