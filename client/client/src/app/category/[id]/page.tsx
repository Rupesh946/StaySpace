import CategoryTemplate from "@/components/CategoryTemplate";

export default function CategoryPage({ params }: { params: { id: string } }) {
    return <CategoryTemplate categorySlug={params.id} />;
}
