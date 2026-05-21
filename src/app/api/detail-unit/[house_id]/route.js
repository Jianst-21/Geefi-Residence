import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, { params }) {
    const { house_id } = await params  // ← await params

    const { data, error } = await supabase
        .from('FeatureBenefits')
        .select(`
            benefit_id,
            benefit_name,
            created_at,
            Houses (
                house_id,
                house_name,
                house_type,
                category,
                block,
                price,
                land_area,
                building_area,
                bedroom,
                bathroom,
                living_room,
                kitchen,
                carport,
                sanitation,
                electricity,
                water_source,
                description,
                status
            )
        `)
        .eq('house_id', house_id)

    if (error) {
        return NextResponse.json({ success: false, error: error.message })
    }

    const house = data?.[0]?.Houses ?? null
    const benefits = data.map(({ benefit_id, benefit_name, created_at }) => ({
        benefit_id,
        benefit_name,
        created_at
    }))

    return NextResponse.json({
        success: true,
        total_benefits: benefits.length,
        data: {
            ...house,
            benefits
        }
    })
}