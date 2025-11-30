'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddRecipeButtonSquare() {
	return (
    <Button asChild variant="outline">
      <Link href="/blue-binder/recipes/create">Add New Recipe</Link>
    </Button>
	)
}