
-- Fonction pour récupérer les points de chronométrage d'une épreuve
CREATE OR REPLACE FUNCTION public.get_timing_points(stage_id_param UUID)
RETURNS SETOF public.timing_points
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM public.timing_points
  WHERE stage_id = stage_id_param
  ORDER BY order_index ASC;
$$;

-- Fonction pour ajouter un point de chronométrage
CREATE OR REPLACE FUNCTION public.add_timing_point(
  p_stage_id UUID,
  p_name TEXT,
  p_description TEXT,
  p_latitude NUMERIC,
  p_longitude NUMERIC,
  p_point_type TEXT,
  p_order_index INTEGER
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.timing_points (
    stage_id, name, description, latitude, longitude, 
    point_type, order_index
  ) VALUES (
    p_stage_id, p_name, p_description, p_latitude, p_longitude, 
    p_point_type, p_order_index
  ) RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Fonction pour mettre à jour un point de chronométrage
CREATE OR REPLACE FUNCTION public.update_timing_point(
  p_id UUID,
  p_name TEXT,
  p_description TEXT,
  p_latitude NUMERIC,
  p_longitude NUMERIC,
  p_point_type TEXT,
  p_order_index INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.timing_points SET
    name = p_name,
    description = p_description,
    latitude = p_latitude,
    longitude = p_longitude,
    point_type = p_point_type,
    order_index = p_order_index,
    updated_at = now()
  WHERE id = p_id;
  
  RETURN FOUND;
END;
$$;

-- Fonction pour supprimer un point de chronométrage
CREATE OR REPLACE FUNCTION public.delete_timing_point(p_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.timing_points WHERE id = p_id;
  RETURN FOUND;
END;
$$;
