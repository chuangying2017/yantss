<template>
    <gallery :limit="5" :images.sync="images"></gallery>
    <div class="row" v-if="!$loadRouteData">
        <div class="col-xs-12">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#basic" data-toggle="tab" aria-controls="basic" role="tab"
                                                              data-toggle="tab">基本信息</a></li>
                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="basic">
                        <form class="form-horizontal">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="box-body">



                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label">支付协议</label>

                                            <div class="col-sm-10">
                                                <editor :model.sync="product.detail"></editor>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword3" class="col-sm-2 control-label"></label>

                                            <div class="col-sm-10">
                                                <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- /.box -->
        </div>
    </div>
</template>
<script>
    import Gallery from '../../gallery/index.vue'
    import Editor from '../../editor.vue'
    import api from 'api/index.js'
    export default {
        name: 'EditProduct',
        components: [Gallery, Editor],
        data: function () {
            return {
                limitTimeSales: false,
                product: {
                    info: {},
                    group_ids: []
                },
                sku: {},
                editor: {},
                images: [],
                categories: [],
                groups: []
            }
        },
        route: {
            data ({to: {params: {product_id}}}) {
                var self = this
                return Promise.all([api.categories.getAll(), api.groups.getAll(), api.products.get(product_id)]).then(function ([categories, groups, product]) {
                    self.$broadcast('init')
                    var groupIds = []
                    product.groups.forEach(function (val) {
                        groupIds.push(val.id)
                    })
                    product.images.forEach(function (val) {
                        if (product.cover_image.indexOf(val.media_id) > -1) {
                            val.cover = true
                        } else {
                            val.cover = false
                        }
                    })
                    return {
                        categories: categories,
                        groups: groups,
                        images: product.images,
                        product: {
                            id: product.id,
                            cat_id: product.cats.length > 0 ? product.cats[0]['id'] : null,
                            title: product.title,
                            sub_title: product.sub_title,
                            priority: product.priority,
                            digest: product.digest,
                            cover_image: product.cover_image,
                            detail: product.info.detail,
                            type: product.type,
                            image_ids: product.image_ids,
                            group_ids: groupIds,
                            with_invoice: product.with_invoice,
                            with_care: product.with_care,
                            tags: product.info.tags,
                            open_time: product.open_time,
                            end_time: product.end_time,
                            skus: []
                        },
                        sku: {
                            name: product['skus']['name'],
                            cover_image: product['skus']['cover_image'],
                            display_price: product['skus']['display_price'],
                            price: product['skus']['price'],
                            express_fee: product['skus']['express_fee'],
                            bar_code: product['skus']['bar_code'],
                            stock: product['skus']['stock'],
                            unit: product['skus']['unit'],
                            income_price: product['skus']['income_price'],
                            settle_price: product['skus']['settle_price'],
                            attr_value_ids: []
                        }
                    }
                })
            }
        },
        watch: {
            images (newVal) {
                if (typeof newVal === 'object') {
                    var self = this
                    this.product.image_ids = []
                    newVal.map(function (val) {
                        self.product.image_ids.push(val.media_id)
                    })
                }
            }
        },
        methods: {
            setCover (index, image) {
                this.$set('product.cover_image', image.url)
                this.images.forEach(function (val) {
                    val.cover = false
                })
                var oldImage = this.images[index]
                oldImage.cover = true
                this.images.$set(index, oldImage)
            },
            removeImage (image) {
                this.images.$remove(image)
            },
            openGallery: function (cb) {
                this.$broadcast('openGallery', cb)
            },
            getSku () {
                this.sku.cover_image = this.product.cover_image
                this.sku.name = this.product.title
                this.product.skus = [this.sku]
            },
            submit () {
                var self = this
                this.getSku()
                api.products.update(this.product.id, this.product).then(function (da) {
                    window.alert('更新成功!')
                    self.$route.router.go('/dashboard/products/list')
                })
            }
        }
    }
</script>
<style>
    .mb20 {
        margin-bottom: 20px;
    }

    .cover-mask {
        position: absolute;
        top: 0;
        left: 15px;
        width: 80px;
        height: 80px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 3px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    .thumbnail-mask .cover-mask {
        display: none;
    }

    .thumbnail-mask:hover .cover-mask {
        display: block;
    }

    .cover-label {
        position: absolute;
        top: 0;
        left: 15px;
        background: #00cc3d;
        color: #fff;
        padding: 2px 5px;
        font-size: 12px;
    }
</style>
