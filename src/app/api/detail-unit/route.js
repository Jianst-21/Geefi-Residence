import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {

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
                is_available
            )
        `)

    if (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        })
    }

    return NextResponse.json({
        success: true,
        total: data.length,
        data: data
    })
}