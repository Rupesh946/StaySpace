import CategoryTemplate from "@/components/CategoryTemplate";

export default function SpacePage({ params }: { params: { id: string } }) {
    return <CategoryTemplate categorySlug={params.id} />;
}
