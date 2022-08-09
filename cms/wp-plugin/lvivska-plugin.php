<?php
/**
 * Plugin Name: LVIVSKA MMXXII
 * Author: Damian Kress
 * Author URI: https://www.damiankress.de/
 * Description:
 * Version: 0.0.1
 * Requires at least: 6.0
 * Tested up to: 6.0
 * Requires PHP: 8.0
 * License: GNU General Public License v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: dkress/lvivska-mmxxii
 * This theme, like WordPress, is licensed under the GPL.
 * Use it to make something cool, have fun, and share what you've learned with others.
 */

LvivskaPlugin::instance();

class LvivskaPlugin {
	private static ?self $instance = null;

	public function __construct() {
		self::$instance = $this;
		add_action('init', [$this, 'init']);
		add_action('acf/init', [$this, 'register_store_settings_page']);
	}

	public static function instance(): self {
		if (!self::$instance) self::$instance = new self();
		return self::$instance;
	}

	public function init() {
		add_theme_support('post-thumbnails', ['page', 'product']);

		register_post_type('product', [
			"hierarchical" => false,
			"label"        => __("Products"),
			"menu_icon"    => "dashicons-tag",
			"public"       => true,
			"rest_base"    => "products",
			"show_in_rest" => true,
			"supports"     => [
				"editor",
				"page-attributes",
				"revisions",
				"thumbnail",
				"title",
			],
		]);
	}

	public function register_store_settings_page() {
		if (function_exists('acf_add_options_sub_page')) {
			acf_add_options_sub_page(
				[
					//'capability'  => 'publish_products',
					'menu_title'  => __('Store Settings'),
					'page_title'  => __('LVIVSKA Store Settings'),
					//'parent_slug' => 'edit.php?post_type=warning-product',
					'parent_slug' => 'index.php',
				]
			);
		}
	}

	public function register_acf_groups() {
		if (function_exists('acf_add_local_field_group')):

			acf_add_local_field_group(
				[
					'key'                   => 'group_62f006c11aff9',
					'title'                 => 'Produktdetails',
					'fields'                => [
						[
							'key'               => 'field_62f006cdbeb1c',
							'label'             => 'Füllmenge',
							'name'              => 'capacity',
							'type'              => 'number',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => 'l',
							'min'               => -1,
							'max'               => '',
							'step'              => '0.25',
						],
						[
							'key'               => 'field_62f0073cbeb1d',
							'label'             => 'Preis',
							'name'              => 'price',
							'type'              => 'number',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '€',
							'min'               => 3,
							'max'               => '',
							'step'              => '',
						],
						[
							'key'               => 'field_62f00766beb1e',
							'label'             => 'Lagerbestand',
							'name'              => 'stock',
							'type'              => 'number',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'min'               => 0,
							'max'               => '',
							'step'              => '',
						],
						[
							'key'               => 'field_62f00782beb1f',
							'label'             => 'Gewicht',
							'name'              => 'weight',
							'type'              => 'number',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => 'kg',
							'min'               => 0,
							'max'               => '',
							'step'              => 11,
						],
						[
							'key'               => 'field_62f007ddbeb20',
							'label'             => 'Abmessungen',
							'name'              => 'dimensions',
							'type'              => 'group',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'layout'            => 'block',
							'sub_fields'        => [
								[
									'key'               => 'field_62f00805beb21',
									'label'             => 'Breite',
									'name'              => 'width',
									'type'              => 'number',
									'instructions'      => '',
									'required'          => 1,
									'conditional_logic' => 0,
									'wrapper'           => [
										'width' => '',
										'class' => '',
										'id'    => '',
									],
									'default_value'     => '',
									'placeholder'       => '',
									'prepend'           => '',
									'append'            => 'cm',
									'min'               => 0,
									'max'               => '',
									'step'              => '',
								],
								[
									'key'               => 'field_62f0082ebeb22',
									'label'             => 'Höhe',
									'name'              => 'height',
									'type'              => 'number',
									'instructions'      => '',
									'required'          => 1,
									'conditional_logic' => 0,
									'wrapper'           => [
										'width' => '',
										'class' => '',
										'id'    => '',
									],
									'default_value'     => '',
									'placeholder'       => '',
									'prepend'           => '',
									'append'            => 'cm',
									'min'               => 0,
									'max'               => '',
									'step'              => '',
								],
								[
									'key'               => 'field_62f0083ebeb23',
									'label'             => 'Tiefe',
									'name'              => 'depth',
									'type'              => 'number',
									'instructions'      => '',
									'required'          => 1,
									'conditional_logic' => 0,
									'wrapper'           => [
										'width' => '',
										'class' => '',
										'id'    => '',
									],
									'default_value'     => '',
									'placeholder'       => '',
									'prepend'           => '',
									'append'            => 'cm',
									'min'               => 0,
									'max'               => '',
									'step'              => '',
								],
							],
						],
					],
					'location'              => [
						[
							[
								'param'    => 'post_type',
								'operator' => '==',
								'value'    => 'product',
							],
						],
					],
					'menu_order'            => 0,
					'position'              => 'side',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
					'show_in_rest'          => 1,
				]
			);

			acf_add_local_field_group(
				[
					'key'                   => 'group_62f0087bc6141',
					'title'                 => 'Produktinformation',
					'fields'                => [
						[
							'key'               => 'field_62f00885a11b5',
							'label'             => 'Untertitel',
							'name'              => 'subtitle',
							'type'              => 'text',
							'instructions'      => '',
							'required'          => 1,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '',
							'maxlength'         => '',
						],
					],
					'location'              => [
						[
							[
								'param'    => 'post_type',
								'operator' => '==',
								'value'    => 'product',
							],
						],
					],
					'menu_order'            => 0,
					'position'              => 'acf_after_title',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
					'show_in_rest'          => 1,
				]
			);

			acf_add_local_field_group(
				[
					'key'                   => 'group_62f00c411b665',
					'title'                 => 'Store settings',
					'fields'                => [
						[
							'key'               => 'field_62f00c5a273e3',
							'label'             => 'Mehrwertsteuer',
							'name'              => 'mwst',
							'type'              => 'number',
							'instructions'      => '',
							'required'          => 0,
							'conditional_logic' => 0,
							'wrapper'           => [
								'width' => '',
								'class' => '',
								'id'    => '',
							],
							'default_value'     => '',
							'placeholder'       => '',
							'prepend'           => '',
							'append'            => '%',
							'min'               => 0,
							'max'               => '',
							'step'              => '',
						],
					],
					'location'              => [
						[
							[
								'param'    => 'options_page',
								'operator' => '==',
								'value'    => 'acf-options-store-settings',
							],
						],
					],
					'menu_order'            => 0,
					'position'              => 'normal',
					'style'                 => 'default',
					'label_placement'       => 'top',
					'instruction_placement' => 'label',
					'hide_on_screen'        => '',
					'active'                => true,
					'description'           => '',
					'show_in_rest'          => 1,
				]
			);

		endif;
	}
}