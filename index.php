<?php
/**
 * Plugin Name: Conversion Bridge for JetFormBuilder
 * Description: Custom admin panel for JetFormBuilder forms
 * Author:      Conversion Bridge
 * Author URI:  https://conversionbridgewp.com
 * Version:     0.1
 */

add_action( 'jet-form-builder/editor-assets/before', 'cb_enqueue_editor_scripts' );
function cb_enqueue_editor_scripts() {
		wp_enqueue_script(
			'conversion-bridge-jetformbuilder-block-editor',
			plugin_dir_url( __FILE__ ) . '/block-editor.js',
			array(),
			filemtime( dirname( __FILE__ ) . '/block-editor.js' ), // Version
			true
		);
}

add_action( 'init', 'register_conversion_tracking_meta' );
function register_conversion_tracking_meta() {
	register_post_meta( 'post', 'enable_conversion_tracking', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	));
	register_post_meta( 'post', 'conversion_tracking_label', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta( 'post', 'conversion_tracking_value', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
	register_post_meta( 'post', 'google_ads_conversion_id', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
}
