export const lasGraphTemplate = ({ graphId, title = '', grouped_or_independent = 'independent' }) => {
    return [{
        "curve_box": {
            "show_well_name": "yes", /// not built yet
            "show_depth_type": "no", /// not built yet
            "show_curve_units": "yes", /// not built yet
            "curve_box_depth_min": -999, /// not built yet
            "curve_box_depth_max": -999, /// not built yet
            "take_out_null_or_visualize": "no", /// not built yet
            "show_title": title === '' ? "no" : "yes",
            "width": 200,
            "height": 700,
            "height_multiplier_components": 0.99,
            "margin": { "top": 10, "right": 10, "bottom": 0, "left": 80 },
            "title": { "text": title, "title_font_size": "10px" }, /// not built yet
            "div_id": graphId, /// Should be skip-able // default=random str? What happens if div doesn't exist?
            "order_of_component": ["curves", "rectanges", "lines"], /// not built yet
            "lines_connected_across_curveboxes": "no", /// not built yet
            "header_sep_svg_or_not": "yes",
            "svg_header_height": "5em",
            "gridlines": "yes",
            "gridlines_color": "#D3D3D3",
            "gridlines_stroke_width": 0.30,
            "grouped_or_independent_x_scales": grouped_or_independent,
            //// variables for how to draw mouseover of hover box
            "mouseover_yes_or_no": "yes", //// "yes" or "no"
            "mouseover_depth_or_depth_and_curve": "depth_and_curve", /// options= "depth_and_curve", "depth", or "curve"
            "mouseover_curvename": "default", //// default is first curve
            "mouseover_color_or_default_which_is_curve_color": "default" /// default is default, which then uses curve color or black
        },
        "components": [{
            "curves": [
                {
                    "data_type": "curve",
                    "curve_names": ["RHOB"],
                    "curve_colors": ["black"],
                    "curve_stroke_dasharray": ["solid"],
                    "stroke_linecap": ["butt"],
                    "stroke_width": [1.8],
                    "fill": [
                        {
                            "curve_name": "RHOB",
                            "fill": "yes",
                            "fill_direction": "left",
                            "cutoffs": [0.21, 2.23, 2.24],
                            "fill_colors": ["gray", "beige", "white"],
                            "curve2": ""
                        }
                    ],
                    "curve_units": ["g/cm3"],
                    "depth_limits": [{ "min": "autocalculate", "max": "autocalculate" }],
                    "curve_limits": [{ "curve_name": "LL3", "min": 5, "max": 10 }],
                    "depth_curve_name": "DEPT",/// not built yet
                    "data_id": ["placeholder_data_id",], /// not built yet
                    "well_names": [""], /// not built yet
                    "scale_linear_log_or_yours": ["linear"],
                    "line_color": ["red"], /// not built yet
                    "max_depth": "autocalculate", /// not built yet
                    "min_depth": "autocalculate", /// not built yet
                    "depth_type_string": [""],
                    "depth_units_string": [""],
                    "null_value": [""], /// not built yet
                }
            ],
            "lines": [
                {
                    "data_type": "line",  /// not built yet
                    "label": "example",  /// not built yet
                    "depth": -999, /// not built yet
                    "color": "red", /// not built yet
                    "stroke_width": "3px", /// not built yet
                    "stroke_style": "solid", /// not built yet
                    "transparency": 1.0, /// not built yet
                    "stroke_linecap": "butt"
                }
            ],
            "rectangles": [
                {
                    "data_type": "rectangle",
                    "depth_top": 0,
                    "x_starting_upper_left_corner": 0,
                    "width": 100,
                    "height": 100,
                    "stroke_width": "2px",
                    "stroke_linecap": "butt",
                    "fill": "red",
                    "opacity": 0.5,
                    "label": "Core Example", // not built into plotting template yet
                    "label_orientation": "horizontal", // not built into plotting template yet
                    "lable_position": "right" // not built into plotting template yet
                }
            ]
        }]
    }];
};
